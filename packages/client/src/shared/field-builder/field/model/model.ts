import { CreateFieldModelCommand, FieldModel } from './types.ts';

export const createFieldModel = <State>(
  command: CreateFieldModelCommand<State>,
): FieldModel<State> => {
  return {
    create: () => command.state(),
  };
};
