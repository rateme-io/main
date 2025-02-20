import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Popover as ChakraPopover,
  Text,
} from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react/portal';
import { useEvent } from '@khmilevoi/use-event';
import { useAtom } from '@reatom/npm-react';
import {
  PropsWithChildren,
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import { Trans } from '@lingui/react/macro';
import { motion } from 'motion/react';

import { FieldIssue } from '@/shared/field-builder/field';
import { PlacementSide } from '@/shared/ui/popover.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldBuilderContext } from '../context.ts';
import { useFieldContext } from './field.context.ts';
import { Issue } from '@/shared/issue-manager';

export type IssueRendererProps = PropsWithChildren<{
  ref?: RefObject<HTMLDivElement>;
  className?: string;
  issueId: symbol;
  issueKey?: string;
  message: ReactNode;
  placement?: PlacementSide[];
  containerProps?: BoxProps;
}>;

export const IssueRenderer = reatomMemo<IssueRendererProps>(
  ({
    ref,
    className,
    issueId,
    issueKey,
    message,
    placement = ['right', 'left'],
    containerProps,
    children,
  }) => {
    const { model } = useFieldBuilderContext();
    const { node } = useFieldContext();

    const manager = node.builder.issueManager;

    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const $issue = useMemo(() => {
      return manager.issueAtom(issueId, issueKey);
    }, [manager, issueId, issueKey]);

    const [issue] = useAtom($issue);

    const isActive = !!issue;

    const [isOpened, setIsOpened] = useState(false);

    const fontColor = issue?.type && fontColors[issue.type];
    const bgColor = issue?.type && bgColors[issue.type];
    const borderColor = issue?.type && borderColors[issue.type];

    useEffect(() => {
      return model.actions.validate.onCall((ctx) => {
        if (ctx.get($issue)) {
          containerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      });
    }, [$issue, model.actions.validate]);

    const handleOpen = useEvent(() => {
      setIsOpened(isActive);
    });

    const handleClose = useEvent(() => {
      setIsOpened(false);
    });

    return (
      <ChakraPopover.Root
        size={'lg'}
        unmountOnExit
        lazyMount
        autoFocus={false}
        positioning={{
          placement: placement[0],
          flip: placement.slice(1),
          gutter: 8,
        }}
        open={isOpened}
      >
        <ChakraPopover.Trigger asChild>
          <Box
            {...containerProps}
            ref={containerRef}
            className={className}
            onMouseMove={handleOpen}
            onMouseLeave={handleClose}
            position={'relative'}
          >
            <Box
              position={'absolute'}
              top={'-5.5px'}
              left={'-4px'}
              right={'-4px'}
              bottom={'-5.5px'}
              borderColor={borderColor ?? 'transparent'}
              borderWidth={2}
              borderRadius={'md'}
              pointerEvents={'none'}
            />
            {children}
          </Box>
        </ChakraPopover.Trigger>

        <Portal>
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
              zIndex={'popover'}
            >
              <ChakraPopover.Arrow>
                <ChakraPopover.ArrowTip
                  backgroundColor={`${bgColor} !important`}
                />
              </ChakraPopover.Arrow>
              <ChakraPopover.Body padding={0}>{message}</ChakraPopover.Body>
            </ChakraPopover.Content>
          </ChakraPopover.Positioner>
        </Portal>
      </ChakraPopover.Root>
    );
  },
  'IssueRenderer',
);

type IssueColors = {
  [key in Issue['type']]: FlexProps['color'];
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
