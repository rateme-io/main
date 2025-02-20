import { generateId } from '@/shared/utils/generate-id.ts';

import { CreateFieldCommand, Field } from './types';

export const createField = <BuilderState, PreviewState>({
  name,
  builder,
  preview,
}: CreateFieldCommand<BuilderState, PreviewState>): Field<
  BuilderState,
  PreviewState
> => {
  return {
    id: `${name}-${generateId()}`,
    builder,
    preview,
  };
};
