import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';

import { JsonInterface } from '@rateme/core/domain/common/json.interface';

@Injectable()
export class JsonSchemaService {
  private readonly ajv = new Ajv({ allErrors: true, strict: true });

  validateSchema(schema: JsonInterface) {
    try {
      this.ajv.compile(schema);

      return true;
    } catch {
      return false;
    }
  }

  validateData(schema: JsonInterface, data: JsonInterface) {
    const validate = this.ajv.compile(schema);

    const result = validate(data);

    return {
      isValid: result,
      errors: validate.errors,
    };
  }
}
