import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';

@Injectable()
export class JsonSchemaService {
  private readonly ajv = new Ajv({ allErrors: true, strict: true });

  validateSchema(schema: object) {
    try {
      this.ajv.compile(schema);

      return true;
    } catch {
      return false;
    }
  }

  validateData(schema: object, data: object) {
    const validate = this.ajv.compile(schema);

    const result = validate(data);

    if (validate.errors) {
      console.log(validate.errors);
    }

    return result;
  }
}
