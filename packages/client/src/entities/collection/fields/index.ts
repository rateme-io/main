import { FieldBuilder } from '@/shared/field-builder/manager';

import { BasicFieldGroup } from './basic';
import { ImageFieldGroup } from './image';
import { LinkFieldGroup } from './link';
import { TimeFieldGroup } from './time';

export const createFieldsBuilder = () =>
  FieldBuilder.createModel({
    groups: [BasicFieldGroup, LinkFieldGroup, ImageFieldGroup, TimeFieldGroup],
  });
