import select from '@inquirer/select';
import input from '@inquirer/input';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import * as changeCase from 'change-case';

const rootPath = process.argv[2];

const cli = async () => {
  const templates = fs.readdirSync('./templates');

  const selectedTemplate = await select({
    message: 'Select a template',
    choices: templates.map((dir) => ({
      name: dir,
      value: dir,
    })),
  });

  const indexFile = fs.readFileSync(
    path.join('./templates/', selectedTemplate, '/index.json'),
    'utf-8',
  );

  const config: Config = ConfigSchema.parse(JSON.parse(indexFile));

  const variables = new Set<string>();

  const files = config.files.map((file) => {
    const fileDescriptor = readFile(file, selectedTemplate);

    fileDescriptor.variables.forEach((variable) =>
      variables.add(variable.name),
    );

    return fileDescriptor;
  });

  extractVariables(JSON.stringify(config)).forEach((variable) =>
    variables.add(variable.name),
  );

  console.log(`\nVariables: ${[...variables].join(', ')}`);

  console.log('Fill the variables:\n');

  const values = new Map<string, string>();

  for (const variable of variables) {
    const value = await input({
      message: `Value for ${variable}: `,
    });

    values.set(variable, value);
  }

  console.log('\nValues:');
  console.table([...values].map(([key, value]) => ({ name: key, value })));

  const fileStructure = generateFs({
    files: files,
    values: values,
  });

  console.log('\nFile Structure:');

  printFs(fileStructure);

  createFs({
    structure: fileStructure,
    values,
    rootDir: path.join(rootPath, insertVariables(config.dirName, values)),
  });
};

const printFs = (structure: Structure, level = 0) => {
  for (const [key, value] of structure) {
    if (value instanceof Map) {
      if (level === 0) {
        console.log(key);
      } else {
        console.log(' '.repeat(level * 2) + key);
      }

      printFs(value, level + 1);
    } else {
      if (level === 0) {
        console.log(key);
      } else {
        console.log(' '.repeat(level * 2) + key);
        console.log(' '.repeat(level * 2) + 'indexFile: ' + value.indexFile);

        console.log(
          ' '.repeat(level * 2) +
            'variables: ' +
            [...new Set(value.variables.map((v) => v.name)).values()].join(
              ', ',
            ),
        );
      }
    }
  }
};

const readFile = (file: File, template: string): FileDescriptor => {
  const content = fs.readFileSync(
    path.join('./templates/', template, file.template),
    'utf-8',
  );

  const variables = extractVariables(content);

  return {
    content,
    variables,
    pathString: file.name,
    path: file.name.split('/').filter((part) => part.trim() !== ''),
    ...file,
  };
};

const VARIABLE_REGEX = /{{(?<name>.*?)}}/g;

const extractVariables = (content: string) => {
  const matches = content.matchAll(VARIABLE_REGEX);

  const variables: Variable[] = [];

  for (const match of matches) {
    if (match.groups?.name) {
      const string = match.groups.name.trim();

      const [name, transformer] = string.split(':');

      variables.push({
        name: name.trim(),
        transformer: transformer?.trim() || null,
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }

  return variables;
};

type Variable = {
  name: string;
  transformer: string | null;
  start: number;
  end: number;
};

const generateFs = ({
  files,
  values,
}: {
  files: FileDescriptor[];
  values: Map<string, string>;
}) => {
  const structure: Structure = new Map();

  files.forEach((file) => {
    file.path.reduce<Structure>((acc, pathPart) => {
      const parsedPath = insertVariables(pathPart, values);

      if (parsedPath.includes('.')) {
        acc.set(parsedPath, file);

        return structure;
      }

      const nextStructure = acc.get(parsedPath) ?? new Map<string, Structure>();

      if (!(nextStructure instanceof Map)) {
        throw new Error(`Path "${parsedPath}" is already a file`);
      }

      if (!acc.has(pathPart)) {
        acc.set(parsedPath, nextStructure);
      }

      return nextStructure;
    }, structure);
  });

  return structure;
};

type Structure = Map<string, FileDescriptor | Structure>;

const createFs = ({
  structure: rootStructure,
  values,
  rootDir,
}: {
  structure: Structure;
  values: Map<string, string>;
  rootDir: string;
}) => {
  const recursion = ({
    structure,
    rootPath,
  }: {
    structure: Structure;
    rootPath: string;
  }) => {
    for (const [key, value] of structure) {
      const pathString = path.join(rootPath, key);

      if (value instanceof Map) {
        fs.mkdirSync(pathString, { recursive: true });

        createIndexFile({
          structure: value,
          dirPath: pathString,
        });

        recursion({ structure: value, rootPath: pathString });
      } else {
        const content = insertVariables(value.content, values);

        fs.writeFileSync(pathString, content);
      }
    }
  };

  recursion({ structure: rootStructure, rootPath: rootDir });
};

const createIndexFile = ({
  dirPath,
  structure,
}: {
  dirPath: string;
  structure: Structure;
}) => {
  const indexExports: string[] = [];

  Array.from(structure.entries()).forEach(([name, item]) => {
    if (item instanceof Map) {
      return;
    }

    if (item.indexFile) {
      indexExports.push(
        `export * from './${name.split('.').slice(0, -1).join('.')}';`,
      );
    }
  });

  if (indexExports.length > 0) {
    fs.writeFileSync(path.join(dirPath, 'index.ts'), indexExports.join('\n'));
  }
};

const insertVariables = (content: string, values: Map<string, string>) => {
  const variables = extractVariables(content);

  let newContent = content;

  let shift = 0;

  for (const variable of variables) {
    const value = values.get(variable.name);

    if (!value) {
      throw new Error(`Value for variable "${variable.name}" not found`);
    }

    const start = variable.start + shift;

    const transformedValue = transformValue(value, variable.transformer);

    newContent =
      newContent.slice(0, start) +
      transformedValue +
      newContent.slice(variable.end + shift);

    shift += transformedValue.length - (variable.end - variable.start);
  }

  return newContent;
};

const transformValue = (value: string, transformer: string | null) => {
  if (!transformer) {
    return value;
  }

  switch (transformer.toLowerCase()) {
    case 'pascalcase':
      return changeCase.pascalCase(value);
    case 'camelcase':
      return changeCase.camelCase(value);
    case 'snakecase':
      return changeCase.snakeCase(value);
    case 'kebabcase':
      return changeCase.kebabCase(value);
    default:
      throw new Error(`Invalid transformer: ${transformer}`);
  }
};

const FileSchema = z.object({
  name: z.string(),
  template: z.string(),
  indexFile: z.boolean(),
});

type File = z.infer<typeof FileSchema>;

type FileDescriptor = {
  content: string;
  variables: Variable[];
  path: string[];
  pathString: string;
} & File;

const ConfigSchema = z.object({
  dirName: z.string(),
  files: z.array(FileSchema),
});

type Config = z.infer<typeof ConfigSchema>;

cli();
