import { useAtom } from '@reatom/npm-react';
import { Navigate, RouteComponent } from '@tanstack/react-router';

import { $application } from '@/entities/application';

export const SecureRoute =
  <Props,>(PageComponent: RouteComponent<Props>) =>
  (props: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [application] = useAtom($application);

    if (application.status === 'unauthorized') {
      return <Navigate to={'/'} />;
    }

    // @ts-expect-error I don't know how to fix this
    return <PageComponent {...props} />;
  };
