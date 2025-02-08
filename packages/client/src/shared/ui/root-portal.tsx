import { PortalProps } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react/portal';
import { FunctionComponent, PropsWithChildren, useRef } from 'react';

type RootPortalProps = PropsWithChildren<PortalProps>;

const rootElement = document.getElementById('root')!;

export const RootPortal: FunctionComponent<RootPortalProps> = (props) => {
  const rootRef = useRef(rootElement);

  return <Portal {...props} container={rootRef} />;
};
