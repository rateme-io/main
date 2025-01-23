import { z } from 'zod';

import { BaseValueObject } from '@/domain/common';

export class NameVo extends BaseValueObject<string> {
  constructor(name: z.infer<typeof NameVo.schema>) {
    super(name, NameVo.schema);
  }

  static schema = z.string().min(1).max(50);
}
