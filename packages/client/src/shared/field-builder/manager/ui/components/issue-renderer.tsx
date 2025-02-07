import {
  Box,
  Flex,
  FlexProps,
  Popover as ChakraPopover,
} from '@chakra-ui/react';
import { useAtom } from '@reatom/npm-react';
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { FieldIssue, FieldIssueManager } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldsManagerContext } from '../context.ts';

export type IssueRendererProps = PropsWithChildren<{
  manager: FieldIssueManager;
  issueId: symbol;
  message: ReactNode;
}>;

export const IssueRenderer = reatomMemo<IssueRendererProps>(
  ({ issueId, manager, message, children }) => {
    const { model } = useFieldsManagerContext();

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
          ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }, [isOpened, issueAtom, model.actions.validate]);

    useEffect(() => {
      setIsOpened(!!issue);
    }, [issue, setIsOpened]);

    return (
      <ChakraPopover.Root
        size={'lg'}
        positioning={{ placement: 'right', gutter: 6 }}
        portalled={false}
        open={isOpened}
        lazyMount
        unmountOnExit
      >
        <ChakraPopover.Trigger asChild>
          <Box position={'relative'}>
            <Box
              position={'absolute'}
              zIndex={1}
              pointerEvents={'none'}
              top={0}
              left={0}
              right={0}
              bottom={0}
              borderColor={borderColor ?? 'transparent'}
              borderWidth={2}
              borderRadius={'md'}
            />
            {children}
          </Box>
        </ChakraPopover.Trigger>
        <Flex zIndex={'popover'} flex={1}>
          <ChakraPopover.Positioner asChild>
            <ChakraPopover.Content
              width="auto"
              px="2"
              py="1"
              textStyle="xs"
              rounded="sm"
              ref={ref}
              backgroundColor={bgColor}
              color={fontColor}
              userSelect={'none'}
              pointerEvents={'none'}
              _hover={{
                opacity: 0,
              }}
            >
              <ChakraPopover.Arrow>
                <ChakraPopover.ArrowTip
                  backgroundColor={`${bgColor} !important`}
                />
              </ChakraPopover.Arrow>
              {message}
            </ChakraPopover.Content>
          </ChakraPopover.Positioner>
        </Flex>
      </ChakraPopover.Root>
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
