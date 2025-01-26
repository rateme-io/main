import { Image } from '@chakra-ui/react';

import SmallSvg from '/favicon.png?url';

export const VerySmallLogo = () => (
  <Image src={SmallSvg} maxHeight={'36px'} maxWidth={'88px'} />
);
