import { action } from '@reatom/framework';

import { createIssueManager, ValidationApi } from '@/shared/issue-manager';

import { BuilderModel, CreateBuilderModelCommand } from './types';

export const FIELD_NAME_ISSUE = Symbol('FIELD_NAME_ISSUE');

export const createBuilderModel = <BuilderState>({
  state: createState,
  validate,
}: CreateBuilderModelCommand<BuilderState>): BuilderModel<BuilderState> => {
  return {
    create: (command) => {
      const state = createState(command);

      const validateName = action((ctx, name: string) => {
        if (name.trim() === '') {
          issueManager.addIssue(ctx, {
            type: 'critical',
            id: FIELD_NAME_ISSUE,
            message: 'Name is required',
          });
        }
      }, 'validateName');

      const issueManager = createIssueManager({
        validate: action((ctx, api: ValidationApi) => {
          if (!validate) {
            validateName(ctx, ctx.get(command.$name));
          } else {
            validate(ctx, {
              state,
              validateName,
              addIssue: api.addIssue,
            });
          }
        }, 'issueManager.validate'),
      });

      return {
        state,
        issueManager,
      };
    },
  };
};
