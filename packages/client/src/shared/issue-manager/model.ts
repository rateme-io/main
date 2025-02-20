import {
  Action,
  action,
  Atom,
  atom,
  MapAtom,
  reatomMap,
} from '@reatom/framework';

export type Issue = {
  type: 'warning' | 'critical';
  id: symbol;
  key?: string;
  message?: string;
};

export type IssueManager = {
  addIssue: Action<[issue: Issue], void>;
  getIssue: Action<[id: symbol, key?: string], Issue | null>;
  issueAtom: (id: symbol, key?: string) => Atom<Issue | null>;
  validate: Action<[], boolean>;
  revalidate: Action<[], boolean>;
};

export type ValidationApi = {
  addIssue: Action<[issue: Issue], void>;
};

export const DEFAULT_ISSUE_KEY = '_DEFAULT_';

export const createIssueManager = ({
  validate,
}: {
  validate: Action<[api: ValidationApi], void>;
}): IssueManager => {
  const $issuesMap = reatomMap<symbol, MapAtom<string, Issue>>(
    new Map(),
    '$issuesMap',
  );
  const $issueTypes = reatomMap<Issue['type'], number>(
    new Map(),
    '$issueTypes',
  );

  const addIssue = action((ctx, issue: Issue) => {
    $issueTypes.set(
      ctx,
      issue.type,
      ($issueTypes.get(ctx, issue.type) ?? 0) + 1,
    );

    const issues =
      $issuesMap.get(ctx, issue.id) ?? reatomMap(new Map(), 'issues');

    issues.set(ctx, issue.key ?? DEFAULT_ISSUE_KEY, issue);

    $issuesMap.set(ctx, issue.id, issues);
  }, 'addIssue');

  const runValidation = action((ctx) => {
    $issueTypes.clear(ctx);
    $issuesMap.clear(ctx);

    validate(ctx, {
      addIssue,
    });

    return !$issueTypes.get(ctx, 'critical');
  }, 'runValidation');

  return {
    addIssue,
    getIssue: action(
      (ctx, id, key?: string) =>
        $issuesMap.get(ctx, id)?.get(ctx, key ?? DEFAULT_ISSUE_KEY) ?? null,
      'issueManager.getIssue',
    ),
    issueAtom: (id, key) =>
      atom((ctx) => {
        ctx.spy($issuesMap);

        const issues = $issuesMap.get(ctx, id);

        if (!issues) {
          return null;
        }

        ctx.spy(issues);

        const issue = issues.get(ctx, key ?? DEFAULT_ISSUE_KEY);

        if (!issue) {
          return null;
        }

        return issue;
      }, 'issueManager.issueAtom'),
    validate: runValidation,
    revalidate: action((ctx) => {
      if (ctx.get($issuesMap).size === 0) {
        return true;
      }

      return runValidation(ctx);
    }, 'issueManager.revalidate'),
  };
};
