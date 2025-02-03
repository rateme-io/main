import { createFieldsManager } from '@/shared/field-builder/manager';

import { BasicFieldGroup } from './basic';

export const CollectionFields = createFieldsManager({
  groups: [BasicFieldGroup],
});
