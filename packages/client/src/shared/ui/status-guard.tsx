import { reatomComponent } from '@reatom/npm-react';
import { PropsWithChildren } from 'react';

import { $application, ApplicationStatus } from '@/entities/application';

export type StatusGuardProps = PropsWithChildren<{
  status: ApplicationStatus;
}>;

export const StatusGuard = reatomComponent<StatusGuardProps>(
  ({ ctx, status, children }) => {
    const application = ctx.spy($application);

    if (application.status !== status) {
      return null;
    }

    return <>{children}</>;
  },
  'StatusGuard',
);
