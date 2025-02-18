import { FieldBuilderModel } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export type CollectionItemProps = {
  model: FieldBuilderModel;
};

export const CollectionItem = reatomMemo<CollectionItemProps>(() => {
  return null;
}, 'CollectionItem');
