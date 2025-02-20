export type PreviewInstance<PreviewState> = {
  state: PreviewState;
};

export type PreviewModel<PreviewState> = {
  create: () => PreviewInstance<PreviewState>;
};

export type InferPreviewState<Model> =
  Model extends PreviewModel<infer PreviewState> ? PreviewState : never;
