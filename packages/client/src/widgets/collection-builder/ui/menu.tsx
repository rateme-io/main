import { css } from '@emotion/css';
import { clsx } from 'clsx';
import { Resizable } from 're-resizable';
import { RefObject, useImperativeHandle, useRef, useState } from 'react';

import { reatomMemo } from '@/shared/ui/reatom-memo';
import { CollectionFields } from '@/widgets/collection-builder/fields';

export type MenuProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

export const Menu = reatomMemo<MenuProps>(({ containerRef }) => {
  const resizableRef = useRef<Resizable>(null);

  const [isResizing, setIsResizing] = useState(false);

  useImperativeHandle(
    containerRef,
    () => resizableRef.current?.resizable ?? null,
  );

  return (
    <Resizable
      ref={resizableRef}
      className={containerStyles}
      defaultSize={{ width: 400 }}
      maxWidth={600}
      minWidth={300}
      enable={{ left: true }}
      handleClasses={{
        left: clsx(
          isResizing && 'resizable-handle-left--active',
          'resizable-handle-left',
        ),
      }}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={() => setIsResizing(false)}
    >
      <CollectionFields.Menu />
    </Resizable>
  );
}, 'Menu');

const containerStyles = css`
  box-shadow: var(--chakra-shadows-sm);

  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;
  overflow-y: auto;

  .resizable-handle-left {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 100%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      &::after {
        background-color: var(--chakra-colors-bg-inverted);
      }
    }

    &--active {
      position: relative;

      &::after {
        background-color: var(--chakra-colors-bg-inverted);
      }
    }
  }
`;
