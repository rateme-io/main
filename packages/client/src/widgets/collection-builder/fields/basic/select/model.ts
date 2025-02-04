import { arrayMove } from '@dnd-kit/sortable';
import { action, atom } from '@reatom/framework';
import { z } from 'zod';

import { FieldAtom, fieldAtom } from '@/shared/atoms/field.atom.ts';
import { createFieldModel, InferState } from '@/shared/field-builder/field';
import { generateId } from '@/shared/utils/generate-id';

export const DropdownFieldModel = createFieldModel({
  state: ({ $name }) => ({
    $name,
    model: createModel(),
  }),
});

export type DropdownFieldState = InferState<typeof DropdownFieldModel>;

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

      $options(ctx, (options) => [
        ...options,
        {
          value: generateId(),
          labelField: fieldAtom({
            defaultValue: validValue,
            schema: labelSchema,
            name: '$labelField',
          }),
        },
      ]);
    }, 'createModel.add'),
    remove: action((ctx, value: string) => {
      $options(ctx, (options) =>
        options.filter((option) => option.value !== value),
      );
    }, 'createModel.remove'),
  };
};
