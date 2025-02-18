import {
  action,
  atom,
  reatomBoolean,
  withAssign,
  withComputed,
} from '@reatom/framework';
import { z } from 'zod';

import { fieldAtom } from '@/shared/atoms/field.atom.ts';
import { formAtom } from '@/shared/atoms/form.atom.ts';
import { FieldBuilderModel } from '@/shared/field-builder/manager';

export const createCollectionBuilderModel = ({
  fields,
}: {
  fields: FieldBuilderModel;
}) => {
  const nameField = fieldAtom({
    defaultValue: '',
    schema: z.string().min(3),
    name: 'collection-name',
  });

  const imageField = fieldAtom<File | null>({
    defaultValue: null,
    schema: z.instanceof(File).nullable(),
    name: 'collection-image',
  });

  const tagsField = fieldAtom<string[]>({
    defaultValue: [],
    schema: z.array(z.string()),
    name: 'collection-tags',
  });

  const form = formAtom({
    fields: {
      name: nameField,
      image: imageField,
      tags: tagsField,
    },
    name: 'collection-form',
    onSubmit: action(async (_ctx, values) => {
      console.log('Submit form', values);
    }, 'collectionForm.onSubmit'),
  });

  const $step = atom(0, '$step').pipe(
    withAssign((target, name) => ({
      next: action((ctx) => target(ctx, ctx.get(target) + 1), `${name}.next`),
      prev: action((ctx) => target(ctx, ctx.get(target) - 1), `${name}.prev`),
    })),
  );

  const $menuIsHidden = atom((ctx) => {
    return ctx.spy($step) !== 0;
  }, '$menuIsHidden');

  const $menuIsOpened = reatomBoolean(true, '$menuIsOpened').pipe(
    withComputed((ctx) => {
      return !ctx.spy($menuIsHidden);
    }),
  );

  return {
    nameField,
    imageField,
    tagsField,
    form,
    $step,
    $menuIsHidden,
    $menuIsOpened,
    fields,
  };
};

export type CollectionBuilderModel = ReturnType<
  typeof createCollectionBuilderModel
>;
