import { Builder } from './builder';
import { Preview } from './preview';

export type CreateFieldCommand<BuilderState, PreviewState> = {
  name: string;
  builder: Builder<BuilderState>;
  preview: Preview<BuilderState, PreviewState>;
};

export type Field<BuilderState, PreviewState> = {
  id: string;
  comingSoon?: boolean;
  builder: Builder<BuilderState>;
  preview: Preview<BuilderState, PreviewState>;
};
