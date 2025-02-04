import { CreateFieldUICommand, FieldUI } from './types.ts';

export const createFieldUI = <State,>({
  ...rest
}: CreateFieldUICommand<State>): FieldUI<State> => {
  return {
    ...rest,
  };
};
