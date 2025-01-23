import { action, atom } from '@reatom/framework';

import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';

export const $email = atom('');

export const $password = atom('');

export const $passwordComplexity = atom((ctx) => {
  const password = ctx.get($password);
  const result = PasswordVo.schema.safeParse(password);

  const errors = result.error?.errors ?? [];
  const totalRules = 6;
  const passedRules = totalRules - errors.length;

  const level = Math.floor((passedRules / totalRules) * 4);

  return {
    level,
    errors: errors.map((error) => error.message),
  };
});

export const submit = action((ctx) => {
  console.log(ctx.get($email), ctx.get($password));
});

export const reset = action((ctx) => {
  $email(ctx, '');
  $password(ctx, '');
});
