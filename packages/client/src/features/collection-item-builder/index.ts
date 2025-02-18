import { CollectionItemBuilder as ui } from './collection-item-builder.tsx';
import { createCollectionItemBuilderModel } from './model.ts';

export const CollectionItemBuilder = {
  ui,
  createModel: () => createCollectionItemBuilderModel(),
};
