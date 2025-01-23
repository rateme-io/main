import { z } from 'zod';

import { BaseValueObject } from '@/domain/common';

export class LogoUrlVo extends BaseValueObject<string | null> {
  constructor(logoUrl: z.infer<typeof LogoUrlVo.schema>) {
    super(logoUrl, LogoUrlVo.schema);
  }

  static schema = z.string().url().nullable();
}
