import { generateId } from '@/shared/utils/generate-id.ts';

import { CreateFieldCommand, Field } from './types';

export const createField = <State>({
  name,
  model,
  ui,
}: CreateFieldCommand<State>): Field<State> => {
  return {
    id: `${name}-${generateId()}`,
    ui,
    create: () => ({
      id: `${name}-item-${generateId()}`,
      state: model.create(),
    }),
  };
};
