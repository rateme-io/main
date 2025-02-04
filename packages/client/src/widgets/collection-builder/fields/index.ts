import { createFieldsManager } from '@/shared/field-builder/manager';

import { BasicFieldGroup } from './basic';
import { ImageFieldGroup } from './image';
import { LinkFieldGroup } from './link';
import { TimeFieldGroup } from './time';

export const CollectionFields = createFieldsManager({
  groups: [BasicFieldGroup, LinkFieldGroup, ImageFieldGroup, TimeFieldGroup],
});
