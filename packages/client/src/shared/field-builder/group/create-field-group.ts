import { generateId } from '@/shared/utils/generate-id.ts';

import { CreateFieldGroupCommand, FieldGroup } from './types';

export const createFieldGroup = ({
  name,
  icon,
  fields,
  title,
}: CreateFieldGroupCommand): FieldGroup => {
  return {
    id: `${name}-${generateId()}`,
    icon,
    title,
    fields,
  };
};
