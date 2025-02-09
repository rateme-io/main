import { Box, FlexProps, Popover as ChakraPopover } from '@chakra-ui/react';
import { useAtom } from '@reatom/npm-react';
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { FieldIssue } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldsManagerContext } from '../context.ts';
import { useFieldContext } from './field.context.ts';

export type IssueRendererProps = PropsWithChildren<{
  issueId: symbol;
  message: ReactNode;
}>;

export const IssueRenderer = reatomMemo<IssueRendererProps>(
  ({ issueId, message, children }) => {
    const { model } = useFieldsManagerContext();
    const { node } = useFieldContext();

    const manager = node.issueManager;

    const ref = useRef<HTMLDivElement>(null);

    const issueAtom = useMemo(() => {
      return manager.issueAtom(issueId);
    }, [manager, issueId]);

    const [issue] = useAtom(issueAtom);

    const [isOpened, setIsOpened] = useAtom(false);

    const fontColor = issue?.type && fontColors[issue.type];
    const bgColor = issue?.type && bgColors[issue.type];
    const borderColor = issue?.type && borderColors[issue.type];

    useEffect(() => {
      return model.actions.validate.onCall((ctx) => {
        if (ctx.get(issueAtom)) {
          ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      });
    }, [isOpened, issueAtom, model.actions.validate]);

    useEffect(() => {
      setIsOpened(!!issue);
    }, [issue, setIsOpened]);

    return (
      <Box position={'relative'} flex={1}>
        <Box
          position={'absolute'}
          top={-1}
          left={-1}
          right={-1}
          bottom={-1}
          borderColor={borderColor ?? 'transparent'}
          borderWidth={2}
          borderRadius={'md'}
          pointerEvents={'none'}
        />
        {children}

        <ChakraPopover.Root
          size={'lg'}
          positioning={{
            placement: 'right',
            flip: ['left', 'bottom', 'top'],
            gutter: 6,
          }}
          open={isOpened}
        >
          <ChakraPopover.Content
            ref={ref}
            width="auto"
            px="2"
            py="1"
            textStyle="xs"
            rounded="sm"
            backgroundColor={bgColor}
            color={fontColor}
            transition={'opacity 0.2s'}
            position={'absolute'}
            top={'50%'}
            right={'-12px'}
            transform={'translateX(100%) translateY(-50%)'}
            pointerEvents={'none'}
            userSelect={'none'}
            zIndex={2}
            _hover={{
              opacity: 0,
            }}
          >
            <ChakraPopover.Arrow
              top={'50%'}
              left={0}
              transform={'translateX(-50%) translateY(-50%)'}
            >
              <ChakraPopover.ArrowTip
                backgroundColor={`${bgColor} !important`}
              />
            </ChakraPopover.Arrow>
            <ChakraPopover.Body padding={0}>{message}</ChakraPopover.Body>
          </ChakraPopover.Content>
        </ChakraPopover.Root>
      </Box>
    );
  },
  'IssueRenderer',
);

type IssueColors = {
  [key in FieldIssue['type']]: FlexProps['color'];
};

const fontColors: IssueColors = {
  critical: 'red.fg',
  warning: 'orange.fg',
};

const bgColors: IssueColors = {
  critical: 'red.subtle',
  warning: 'orange.subtle',
};

const borderColors: IssueColors = {
  critical: 'border.error',
  warning: 'border.warning',
};
