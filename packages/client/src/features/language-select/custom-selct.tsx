import { ButtonProps } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react/portal';
import { Select as ChakraSelect } from '@chakra-ui/react/select';
import { forwardRef, RefObject } from 'react';

interface SelectTriggerProps extends ChakraSelect.ControlProps {
  clearable?: boolean;
  buttonProps?: ButtonProps;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(props, ref) {
    const { children, buttonProps, ...rest } = props;
    return (
      <ChakraSelect.Control {...rest}>
        <ChakraSelect.Trigger
          {...buttonProps}
          ref={ref}
          cursor={'pointer'}
          border={'none'}
        >
          {children}
        </ChakraSelect.Trigger>
      </ChakraSelect.Control>
    );
  },
);

interface SelectContentProps extends ChakraSelect.ContentProps {
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement>;
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content {...rest} ref={ref} />
        </ChakraSelect.Positioner>
      </Portal>
    );
  },
);

export const SelectItem = forwardRef<HTMLDivElement, ChakraSelect.ItemProps>(
  function SelectItem(props, ref) {
    const { item, children, ...rest } = props;
    return (
      <ChakraSelect.Item
        key={item.value}
        item={item}
        cursor={'pointer'}
        {...rest}
        ref={ref}
      >
        {children}
        <ChakraSelect.ItemIndicator />
      </ChakraSelect.Item>
    );
  },
);

export const SelectRoot = forwardRef<HTMLDivElement, ChakraSelect.RootProps>(
  function SelectRoot(props, ref) {
    return (
      <ChakraSelect.Root
        {...props}
        ref={ref}
        positioning={{ sameWidth: true, ...props.positioning }}
      >
        {props.asChild ? (
          props.children
        ) : (
          <>
            <ChakraSelect.HiddenSelect />
            {props.children}
          </>
        )}
      </ChakraSelect.Root>
    );
  },
) as ChakraSelect.RootComponent;
