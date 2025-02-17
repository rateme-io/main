import { action, atom, MapAtom, reatomMap } from '@reatom/framework';

import {
  CreateFieldModelCommand,
  FieldIssue,
  FieldIssueManager,
  FieldModel,
} from './types.ts';

export const createFieldModel = <State>({
  builderState,
  validateField: _validateField,
}: CreateFieldModelCommand<State>): FieldModel<State> => {
  const validateField =
    _validateField && action(_validateField, 'validateField');

  return {
    createBuilder: (command) => {
      const currentState = builderState(command);

      const $issuesMap = reatomMap<symbol, MapAtom<string, FieldIssue>>(
        new Map(),
        '$issuesMap',
      );
      const $issueTypes = reatomMap<FieldIssue['type'], number>(
        new Map(),
        '$issueTypes',
      );

      const addIssue = action((ctx, issue: FieldIssue) => {
        $issueTypes.set(
          ctx,
          issue.type,
          ($issueTypes.get(ctx, issue.type) ?? 0) + 1,
        );

        const issues =
          $issuesMap.get(ctx, issue.id) ?? reatomMap(new Map(), 'issues');

        issues.set(ctx, issue.key ?? DEFAULT_FIELD_KEY, issue);

        $issuesMap.set(ctx, issue.id, issues);
      }, 'addIssue');

      const validateName = action((ctx, name: string) => {
        if (name.trim() === '') {
          addIssue(ctx, {
            type: 'critical',
            id: FIELD_NAME_ISSUE,
            message: 'Name is required',
          });
        }
      }, 'validateName');

      const issueManager: FieldIssueManager = {
        getIssue: action(
          (ctx, id, key?: string) =>
            $issuesMap.get(ctx, id)?.get(ctx, key ?? DEFAULT_FIELD_KEY) ?? null,
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

            const issue = issues.get(ctx, key ?? DEFAULT_FIELD_KEY);

            if (!issue) {
              return null;
            }

            return issue;
          }, 'issueManager.issueAtom'),
        validate: action((ctx) => {
          $issueTypes.clear(ctx);
          $issuesMap.clear(ctx);

          if (!validateField) {
            validateName(ctx, ctx.get(command.$name));
          } else {
            validateField(ctx, {
              state: currentState,
              addIssue,
              validateName,
            });
          }

          return !$issueTypes.get(ctx, 'critical');
        }, 'issueManager.validate'),
        revalidate: action((ctx) => {
          if (ctx.get($issuesMap).size === 0) {
            return true;
          }

          return issueManager.validate(ctx);
        }, 'issueManager.revalidate'),
      };

      return {
        state: currentState,
        issueManager,
      };
    },
  };
};

export const FIELD_NAME_ISSUE = Symbol('FIELD_NAME_ISSUE');

export const DEFAULT_FIELD_KEY = '_DEFAULT_';
