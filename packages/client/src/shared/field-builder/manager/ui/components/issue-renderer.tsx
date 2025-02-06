import { useAtom } from '@reatom/npm-react';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

import { FieldIssueManager } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { ToggleTip } from '@/shared/ui/toggle-tip';

export type IssueRendererProps = PropsWithChildren<{
  manager: FieldIssueManager;
  issueId: symbol;
  message: ReactNode;
}>;

export const IssueRenderer = reatomMemo<IssueRendererProps>(
  ({ issueId, manager, message, children }) => {
    const issueAtom = useMemo(() => {
      console.log('memo');
      return manager.issueAtom(issueId);
    }, [manager, issueId]);

    const [issue] = useAtom(issueAtom);

    console.log('issue:', issue);

    if (!issue) {
      return children;
    }

    return (
      <ToggleTip
        content={message}
        positioning={{
          placement: 'right',
        }}
        portalled
      >
        {children}
      </ToggleTip>
    );
  },
  'IssueRenderer',
);
