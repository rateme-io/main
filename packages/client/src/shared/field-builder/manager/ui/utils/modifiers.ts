import { Modifier } from '@dnd-kit/core';
import { getEventCoordinates } from '@dnd-kit/utilities';

export const snapRightToCursor: Modifier = ({
  activatorEvent,
  draggingNodeRect,
  transform,
}) => {
  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = getEventCoordinates(activatorEvent);

    if (!activatorCoordinates) {
      return transform;
    }

    const offsetX =
      activatorCoordinates.x - draggingNodeRect.left - draggingNodeRect.width;
    const offsetY =
      activatorCoordinates.y -
      draggingNodeRect.top -
      draggingNodeRect.height / 2;
    return {
      ...transform,
      x: transform.x + offsetX,
      y: transform.y + offsetY,
    };
  }

  return transform;
};
