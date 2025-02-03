import { CreateFieldUICommand, FieldUI } from './types.ts';

export const createFieldUI = <State,>({
  FieldContent,
  FieldOverlay,
  icon,
  title,
  description,
}: CreateFieldUICommand<State>): FieldUI<State> => {
  return {
    title,
    description,
    icon,
    FieldContent,
    FieldOverlay,
  };
};
