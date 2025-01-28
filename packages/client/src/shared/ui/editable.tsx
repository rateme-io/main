import {
  Editable as ChakraEditable,
  EditableRootProps,
  useEditable,
} from '@chakra-ui/react/editable';
import { Flex } from '@chakra-ui/react/flex';
import { FunctionComponent, useLayoutEffect, useRef, useState } from 'react';
import { LuAsterisk, LuPencilLine } from 'react-icons/lu';

export type EditableProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minWidth?: EditableRootProps['minWidth'];
  required?: boolean;
};

export const Editable: FunctionComponent<EditableProps> = ({
  value,
  onChange,
  placeholder,
  minWidth,
  required,
}) => {
  const editable = useEditable({
    value,
    required,
    onValueChange: ({ value }) => onChange(value),
  });

  const [previewWidth, setPreviewWidth] = useState(0);

  const previewRef = useRef<HTMLDivElement>(null);

  const isEmpty = editable.editing ? value === '' : value.trim() === '';

  useLayoutEffect(() => {
    if (previewRef.current) {
      setPreviewWidth(previewRef.current.offsetWidth);
    }
  }, [value]);

  return (
    <ChakraEditable.RootProvider value={editable}>
      <Flex position={'relative'}>
        <ChakraEditable.Preview
          ref={previewRef}
          minWidth={minWidth}
          color={isEmpty ? 'gray.500' : 'inherit'}
          opacity={editable.editing ? 0 : 1}
          hidden={false}
          whiteSpace={'pre'}
        >
          {isEmpty && !editable.editing ? placeholder : value}
        </ChakraEditable.Preview>
        <ChakraEditable.Input
          minWidth={minWidth}
          width={`${previewWidth}px`}
          placeholder={placeholder}
          position={'absolute'}
          top={0}
          left={0}
        />
      </Flex>

      <ChakraEditable.Control>
        <ChakraEditable.EditTrigger cursor={'pointer'} display={'flex'}>
          <LuPencilLine />
          {required && (
            <Flex
              alignItems={'flex-start'}
              color={'red.500'}
              marginTop={'-4px'}
            >
              <LuAsterisk />
            </Flex>
          )}
        </ChakraEditable.EditTrigger>
      </ChakraEditable.Control>
    </ChakraEditable.RootProvider>
  );
};
