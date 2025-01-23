import { Image } from '@chakra-ui/react';

import BigSvg from '/big-logo.svg?url';

export const BigLogo = () => (
  <Image src={BigSvg} minWidth={'104px'} minHeight={'36px'} />
);
