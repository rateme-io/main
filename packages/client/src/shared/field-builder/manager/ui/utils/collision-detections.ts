import {
  closestCenter,
  CollisionDetection,
  rectIntersection,
} from '@dnd-kit/core';

import { CustomActive } from '../hooks/dnd.ts';

export const conditionalCollisionDetection: CollisionDetection = (args) => {
  const active = args.active as CustomActive;

  if (active.data.current?.type === 'board') {
    return closestCenter(args);
  } else {
    return rectIntersection(args);
  }
};
