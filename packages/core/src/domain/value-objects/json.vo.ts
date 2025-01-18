import { BaseValueObject } from '@/domain/common';
import { z } from 'zod';
import { JsonInterface } from '@/domain/common/json.interface';

export class JsonVo extends BaseValueObject<JsonInterface> {
  constructor(json: z.infer<typeof JsonVo.schema>) {
    super(json, JsonVo.schema);
  }


  static schema = z.record(z.any());
}