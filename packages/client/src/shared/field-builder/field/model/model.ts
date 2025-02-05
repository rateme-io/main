import { action } from '@reatom/framework';

import {
  CreateFieldModelCommand,
  FieldIssue,
  FieldIssueManager,
  FieldModel,
} from './types.ts';

export const createFieldModel = <State>({
  state,
  validate,
}: CreateFieldModelCommand<State>): FieldModel<State> => {
  return {
    create: (command) => {
      const currentState = state(command);

      const issuesMap = new Map<symbol, FieldIssue>();

      const addIssue = (issue: FieldIssue) => {
        issuesMap.set(issue.id, issue);
      };

      const validateName = (name: string) => {
        if (name.trim() === '') {
          addIssue({
            type: 'critical',
            id: FIELD_NAME_ISSUE,
            message: 'Name is required',
          });
        }
      };

      const issueManager: FieldIssueManager = {
        getIssue: (id) => issuesMap.get(id) ?? null,
        getIssues: () => Array.from(issuesMap.values()),
        validate: action((ctx) => {
          issuesMap.clear();

          if (!validate) {
            validateName(ctx.get(command.$name));
          } else {
            validate(ctx, {
              state: currentState,
              addIssue,
              validateName,
            });
          }

          return issuesMap.size === 0;
        }, 'issueManager.validate'),
      };

      return {
        state: currentState,
        issueManager,
      };
    },
  };
};

export const FIELD_NAME_ISSUE = Symbol('FIELD_NAME_ISSUE');
