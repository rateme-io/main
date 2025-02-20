import { action } from '@reatom/framework';

import { createIssueManager, ValidationApi } from '@/shared/issue-manager';

import { CreateFieldModelCommand, FieldModel } from './types.ts';

export const FIELD_NAME_ISSUE = Symbol('FIELD_NAME_ISSUE');

export const createFieldModel = <State>({
  builderState,
  validateField: _validateField,
}: CreateFieldModelCommand<State>): FieldModel<State> => {
  const validateField =
    _validateField && action(_validateField, 'validateField');

  return {
    createBuilder: (command) => {
      const currentState = builderState(command);

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
          if (!validateField) {
            validateName(ctx, ctx.get(command.$name));
          } else {
            validateField(ctx, {
              state: currentState,
              validateName,
              addIssue: api.addIssue,
            });
          }
        }, 'issueManager.validate'),
      });

      return {
        state: currentState,
        issueManager,
      };
    },
  };
};
