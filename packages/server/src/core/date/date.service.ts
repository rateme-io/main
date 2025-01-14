import { Injectable } from '@nestjs/common';
import { add, isAfter } from 'date-fns';

@Injectable()
export class DateService {
  addMinutes(data: Date, minutes: number) {
    return add(data, { minutes });
  }

  isAfter(date: Date, dateToCompare: Date) {
    return isAfter(date, dateToCompare);
  }
}
