import { arrayMove } from '@dnd-kit/sortable';
import { action, atom } from '@reatom/framework';
import { z } from 'zod';

import { FieldAtom, fieldAtom } from '@/shared/atoms/field.atom.ts';
import {
  createBuilderModel,
  createPreviewModel,
  InferBuilderState,
  InferPreviewState,
} from '@/shared/field-builder/field';
import { generateId } from '@/shared/utils/generate-id';

export const DROPDOWN_FIELD_LABEL_WARNING = Symbol(
  'DROPDOWN_FIELD_LABEL_WARNING',
);
export const DROPDOWN_FIELD_EMPTY_OPTIONS = Symbol(
  'DROPDOWN_FIELD_EMPTY_OPTIONS',
);
export const DROPDOWN_FIELD_EMPTY_OPTION_LABEL = Symbol(
  'DROPDOWN_FIELD_EMPTY_OPTION_LABEL',
);

export type DropdownFieldOption = {
  value: string;
  labelField: FieldAtom<string>;
};

const labelSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(z.string().min(1));

const createModel = () => {
  const $isMulti = atom<boolean>(false, '$isMulti');
  const $isCreatable = atom<boolean>(false, '$isCreatable');
  const $options = atom<DropdownFieldOption[]>([], '$options');

  const labelField = fieldAtom<string>({
    defaultValue: '',
    schema: labelSchema,
    name: '$labelField',
  });

  return {
    $isMulti,
    $isCreatable,
    $options,
    labelField,
    move: action((ctx, oldValue: string, newValue: string) => {
      if (oldValue !== newValue) {
        $options(ctx, (options) => {
          const activeIndex = options.findIndex(
            (option) => option.value === oldValue,
          );
          const overIndex = options.findIndex(
            (option) => option.value === newValue,
          );

          return arrayMove(options, activeIndex, overIndex);
        });
      }
    }, 'createModel.move'),
    add: action((ctx) => {
      const validValue = labelField.validate(ctx);

      if (!validValue) {
        return;
      }

      labelField.reset(ctx);

      const newOption: DropdownFieldOption = {
        value: generateId(),
        labelField: fieldAtom({
          defaultValue: validValue,
          schema: labelSchema,
          name: '$labelField',
        }),
      };

      $options(ctx, (options) => [...options, newOption]);

      return newOption;
    }, 'createModel.add'),
    blur: action((ctx) => {
      labelField.$error(ctx, null);
    }, 'createModel.blur'),
    remove: action((ctx, value: string) => {
      $options(ctx, (options) =>
        options.filter((option) => option.value !== value),
      );
    }, 'createModel.remove'),
  };
};

export const DropdownFieldBuilderModel = createBuilderModel({
  state: ({ $name }) => ({
    $name,
    model: createModel(),
  }),
  validateField: (ctx, { state, addIssue, validateName }) => {
    const { model, $name } = state;

    validateName(ctx, ctx.get($name));

    const labelValue = ctx.get(model.labelField.$value);
    const options = ctx.get(model.$options);
    const isCreatable = ctx.get(model.$isCreatable);

    if (labelValue.trim() !== '') {
      addIssue(ctx, {
        type: 'warning',
        id: DROPDOWN_FIELD_LABEL_WARNING,
      });
    }

    if (options.length === 0 && !isCreatable) {
      addIssue(ctx, {
        type: 'critical',
        id: DROPDOWN_FIELD_EMPTY_OPTIONS,
      });
    }

    options.forEach((option) => {
      if (ctx.get(option.labelField.$value).trim() === '') {
        addIssue(ctx, {
          type: 'critical',
          key: option.value,
          id: DROPDOWN_FIELD_EMPTY_OPTION_LABEL,
        });
      }
    });
  },
});

export const DropdownFieldPreviewModel = createPreviewModel({
  state: () => ({}),
});

export type DropdownFieldBuilderState = InferBuilderState<
  typeof DropdownFieldBuilderModel
>;
export type DropdownFieldPreviewState = InferPreviewState<
  typeof DropdownFieldPreviewModel
>;
