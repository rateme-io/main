import { z } from 'zod';

import { BaseValueObject } from '@/domain/common/base.value-object';

export class EmailVo extends BaseValueObject<string> {
  constructor(email: z.infer<typeof EmailVo.schema>) {
    super(email, EmailVo.schema);
  }

  static schema = z.string().email();
}
