import { Portal } from '@chakra-ui/react/portal';
import { DragOverlay } from '@dnd-kit/core';
import { reatomComponent } from '@reatom/npm-react';

import { FieldRenderer } from '@/widgets/collection-builder/ui/field-renderer.tsx';

import { FieldContextProvider } from '../board/context.ts';
import { MenuFieldItem } from '../menu/fields-menu.tsx';
import { useDragging } from './hooks.ts';

export const BoardOverlay = reatomComponent(() => {
  const dragData = useDragging();

  switch (dragData?.type) {
    case 'board':
      return (
        <Portal>
          <DragOverlay>
            <FieldContextProvider value={{ isOverlay: true }}>
              <FieldRenderer node={dragData.node} />
            </FieldContextProvider>
          </DragOverlay>
        </Portal>
      );
    case 'menu':
      return (
        <Portal>
          <DragOverlay>
            <MenuFieldItem
              field={dragData.info}
              containerProps={{ zIndex: 'max' }}
            />
          </DragOverlay>
        </Portal>
      );
    default:
      return null;
  }
}, 'BoardOverlay');
