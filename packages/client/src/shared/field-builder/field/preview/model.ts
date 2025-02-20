import { PreviewModel } from './types';

export const createPreviewModel = <State>({
  state: createState,
}: {
  state: () => State;
}): PreviewModel<State> => {
  return {
    create: () => {
      const state = createState();

      return {
        state,
      };
    },
  };
}; 