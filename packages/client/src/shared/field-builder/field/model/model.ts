import { action, atom, reatomMap } from '@reatom/framework';

import {
  CreateFieldModelCommand,
  FieldIssue,
  FieldIssueManager,
  FieldModel,
} from './types.ts';

export const createFieldModel = <State>({
  state,
  validateField: _validateField,
}: CreateFieldModelCommand<State>): FieldModel<State> => {
  const validateField =
    _validateField && action(_validateField, 'validateField');

  return {
    create: (command) => {
      const currentState = state(command);

      const $issuesMap = reatomMap<symbol, FieldIssue>(new Map(), '$issuesMap');
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

        $issuesMap.set(ctx, issue.id, issue);
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
          (ctx, id) => $issuesMap.get(ctx, id) ?? null,
          'issueManager.getIssue',
        ),
        issueAtom: (id) =>
          atom((ctx) => {
            ctx.spy($issuesMap);
            return $issuesMap.get(ctx, id) ?? null;
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
