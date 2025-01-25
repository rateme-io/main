import { Image } from '@chakra-ui/react';

import BigSvg from '/big-logo.svg?url';

export const BigLogo = () => (
  <Image src={BigSvg} maxWidth={'104px'} maxHeight={'36px'} />
);
