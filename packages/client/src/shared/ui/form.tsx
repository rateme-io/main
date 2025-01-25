import { Flex, FlexProps } from '@chakra-ui/react';
import type { HTMLChakraProps } from '@chakra-ui/react/styled-system';
import { FunctionComponent } from 'react';

import { Merge } from '@/shared/types/merge.ts';

export type FormProps = Merge<HTMLChakraProps<'form'>, FlexProps>;

export const Form: FunctionComponent<FormProps> = (props) => {
  return <Flex as={'form'} {...(props as FlexProps)} />;
};
