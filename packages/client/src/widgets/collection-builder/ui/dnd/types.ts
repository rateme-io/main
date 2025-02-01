import { FieldInfo } from '@/widgets/collection-builder/fields-info.tsx';
import { CollectionFields } from '@/widgets/collection-builder/model';

export type DraggableData =
  | {
      type: 'menu';
      info: FieldInfo;
    }
  | {
      type: 'board';
      node: CollectionFields;
    };
