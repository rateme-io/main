import { Image, ImageProps } from '@chakra-ui/react';

import BigSvg from '/big-logo.svg?url';

export const BigLogo = (props: ImageProps) => (
  <Image src={BigSvg} maxWidth={'104px'} maxHeight={'36px'} {...props} />
);
