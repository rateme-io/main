import { PropsWithChildren } from 'react';

import { $application, ApplicationStatus } from '@/entities/application';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export type StatusGuardProps = PropsWithChildren<{
  status: ApplicationStatus;
}>;

export const StatusGuard = reatomMemo<StatusGuardProps>(
  ({ ctx, status, children }) => {
    const application = ctx.spy($application);

    if (application.status !== status) {
      return null;
    }

    return <>{children}</>;
  },
  'StatusGuard',
);
