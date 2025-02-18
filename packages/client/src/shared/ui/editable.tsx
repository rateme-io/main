import { InputProps } from '@chakra-ui/react';
import {
  Editable as ChakraEditable,
  EditableRootProps,
  useEditable,
} from '@chakra-ui/react/editable';
import { Flex } from '@chakra-ui/react/flex';
import { HTMLChakraProps } from '@chakra-ui/react/styled-system';
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
  maxWidth?: EditableRootProps['maxWidth'];
  minWidth?: EditableRootProps['minWidth'];
  required?: boolean;
  onBlur?: InputProps['onBlur'];
  containerProps?: HTMLChakraProps<'div'>;
};

export const Editable: FunctionComponent<EditableProps> = ({
  value,
  onValueChange,
  placeholder,
  maxWidth = '100%',
  minWidth,
  required,
  onBlur,
  containerProps,
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
    <ChakraEditable.RootProvider
      value={editable}
      maxWidth={maxWidth}
      gap={0}
      {...containerProps}
    >
      <Flex
        position={'relative'}
        maxWidth={editable.editing ? maxWidth : `calc(${maxWidth} - 14px)`}
      >
        <ChakraEditable.Preview
          ref={previewRef}
          maxWidth={maxWidth}
          minWidth={minWidth}
          color={isEmpty ? 'fg.muted' : 'inherit'}
          opacity={editable.editing ? 0 : 1}
          hidden={false}
          whiteSpace={'pre'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          display={'inline-block'}
          lineHeight={2}
          _after={{
            content: '"s"',
            visibility: 'hidden',
          }}
          title={value}
        >
          {isEmpty ? placeholder : value}
        </ChakraEditable.Preview>

        <ChakraEditable.Input
          maxWidth={maxWidth}
          minWidth={minWidth}
          width={`${previewWidth}px`}
          position={'absolute'}
          top={0}
          left={0}
          onBlur={onBlur}
        />
      </Flex>

      {!editable.editing && (
        <ChakraEditable.Control>
          <ChakraEditable.EditTrigger cursor={'pointer'} display={'flex'}>
            <LuPencilLine />
            {required && (
              <Flex
                alignItems={'flex-start'}
                color={'fg.error'}
                marginTop={'-4px'}
              >
                <LuAsterisk />
              </Flex>
            )}
          </ChakraEditable.EditTrigger>
        </ChakraEditable.Control>
      )}
    </ChakraEditable.RootProvider>
  );
};
