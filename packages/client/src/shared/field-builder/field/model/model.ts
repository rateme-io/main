import { CreateFieldModelCommand, FieldModel } from './types.ts';

export const createFieldModel = <State>({
  state,
}: CreateFieldModelCommand<State>): FieldModel<State> => {
  return {
    create: (command) => state(command),
  };
};
