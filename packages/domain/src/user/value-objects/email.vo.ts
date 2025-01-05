import {ValueObject} from '@/interfaces';
import * as z from 'zod';

export class EmailVo implements ValueObject {
  constructor(private readonly email: string) {
    this.validate();
  }

  validate(): boolean {
    z.string().email().parse(this.email);

    return true;
  }
}