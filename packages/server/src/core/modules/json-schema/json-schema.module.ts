import { Global, Module } from '@nestjs/common';
import { JsonSchemaService } from './json-schema.service';

@Global()
@Module({
  providers: [JsonSchemaService],
  exports: [JsonSchemaService],
})
export class JsonSchemaModule {}
