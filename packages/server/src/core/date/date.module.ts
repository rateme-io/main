import { Global, Module } from '@nestjs/common';
import { DateService } from '@/core/date/date.service';

@Global()
@Module({
  providers: [DateService],
  exports: [DateService],
})
export class DateModule {}
