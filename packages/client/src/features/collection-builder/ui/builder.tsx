import { Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { Trans } from '@lingui/react/macro';

import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { PageWrapper } from '@/shared/ui/page-wrapper.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from '@/shared/ui/steps.tsx';

import { useCollectionBuilderContext } from '../context.ts';
import { BuildStep } from './steps/build-step.tsx';
import { CheckStep } from './steps/check-step.tsx';

export const Builder = reatomMemo(({ ctx }) => {
  const { model } = useCollectionBuilderContext();

  return (
    <Flex flex={1} overflowY={'auto'} top={0} left={0} right={0} bottom={0}>
      <PageLayout flex={1} height={'fit-content'}>
        <StepsRoot
          step={ctx.spy(model.$step)}
          onStepChange={(event) => model.$step(ctx, event.step)}
          linear
        >
          <PageWrapper
            flex={1}
            height={'fit-content'}
            flexDirection={'column'}
            gap={2}
          >
            <Flex>
              <StepsList width={'100%'}>
                <StepsItem index={0} title={<Trans>Build</Trans>} />
                <StepsItem index={1} title={<Trans>Check</Trans>} />
                <StepsItem index={2} title={<Trans>Publish</Trans>} />
              </StepsList>
            </Flex>

            <Box>
              <StepsContent index={0}>
                <BuildStep />
              </StepsContent>
              <StepsContent index={1}>
                <CheckStep />
              </StepsContent>
              <StepsContent index={2}>Publish</StepsContent>
            </Box>
          </PageWrapper>
        </StepsRoot>
      </PageLayout>
    </Flex>
  );
}, 'Builder');
