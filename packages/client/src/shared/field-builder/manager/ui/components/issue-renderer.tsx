import { Box, FlexProps, Popover as ChakraPopover } from '@chakra-ui/react';
import { useEvent } from '@khmilevoi/use-event';
import { useAtom } from '@reatom/npm-react';
import {
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FieldIssue } from '@/shared/field-builder/field';
import { PlacementSide } from '@/shared/ui/popover.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldsManagerContext } from '../context.ts';
import { useFieldContext } from './field.context.ts';

export type IssueRendererProps = PropsWithChildren<{
  issueId: symbol;
  message: ReactNode;
  placement?: PlacementSide[];
}>;

export const IssueRenderer = reatomMemo<IssueRendererProps>(
  ({ issueId, message, placement = ['right', 'left'], children }) => {
    const { model } = useFieldsManagerContext();
    const { node } = useFieldContext();

    const manager = node.issueManager;

    const ref = useRef<HTMLDivElement>(null);

    const $issue = useMemo(() => {
      return manager.issueAtom(issueId);
    }, [manager, issueId]);

    const [issue] = useAtom($issue);

    const [isOpened, setIsOpened] = useState(false);

    const fontColor = issue?.type && fontColors[issue.type];
    const bgColor = issue?.type && bgColors[issue.type];
    const borderColor = issue?.type && borderColors[issue.type];

    useEffect(() => {
      return model.actions.validate.onCall((ctx) => {
        if (ctx.get($issue)) {
          ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      });
    }, [$issue, model.actions.validate]);

    const handleMouseEnter = useEvent((event: MouseEvent) => {
      event.stopPropagation();
      setIsOpened(!!issue);
    });

    const handleMouseLeave = useEvent(() => {
      setIsOpened(false);
    });

    return (
      <ChakraPopover.Root
        size={'lg'}
        unmountOnExit={false}
        positioning={{
          placement: placement[0],
          flip: placement.slice(1),
          gutter: 6,
        }}
        open={isOpened}
      >
        <Box position={'relative'} flex={1} width={'100%'}>
          <ChakraPopover.Trigger asChild>
            <Box
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                ref={ref}
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
            </Box>
          </ChakraPopover.Trigger>

          <ChakraPopover.Positioner>
            <ChakraPopover.Content
              width="auto"
              px="2"
              py="1"
              minHeight={'24px'}
              textStyle="xs"
              rounded="sm"
              backgroundColor={bgColor}
              color={fontColor}
              zIndex={2}
            >
              <ChakraPopover.Arrow>
                <ChakraPopover.ArrowTip
                  backgroundColor={`${bgColor} !important`}
                />
              </ChakraPopover.Arrow>
              <ChakraPopover.Body padding={0}>{message}</ChakraPopover.Body>
            </ChakraPopover.Content>
          </ChakraPopover.Positioner>
        </Box>
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
