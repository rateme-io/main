import { InputProps } from '@chakra-ui/react';
import {
  Editable as ChakraEditable,
  EditableRootProps,
  useEditable,
} from '@chakra-ui/react/editable';
import { Flex } from '@chakra-ui/react/flex';
import {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { LuAsterisk, LuPencilLine } from 'react-icons/lu';

export type EditableProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: ReactNode;
  minWidth?: EditableRootProps['minWidth'];
  required?: boolean;
  onBlur?: InputProps['onBlur'];
};

export const Editable: FunctionComponent<EditableProps> = ({
  value,
  onValueChange,
  placeholder,
  minWidth,
  required,
  onBlur,
}) => {
  const editable = useEditable({
    value,
    required,
    onValueChange: ({ value }) => onValueChange(value),
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
          _after={{
            content: '"s"',
            visibility: 'hidden',
          }}
        >
          {isEmpty && !editable.editing ? placeholder : value}
        </ChakraEditable.Preview>
        <ChakraEditable.Input
          minWidth={minWidth}
          width={`${previewWidth}px`}
          position={'absolute'}
          top={0}
          left={0}
          onBlur={onBlur}
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
