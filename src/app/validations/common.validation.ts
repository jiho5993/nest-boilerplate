import { HttpStatus, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import ERROR_CODE from '../exceptions/error-code';
import { ClientRequestException } from '../exceptions/request.exception';

@ValidatorConstraint({ name: 'isNumber' })
@Injectable()
export class IsNumber implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_000_0007, HttpStatus.BAD_REQUEST, { value: property });
    }

    if (Number.isInteger(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_001_0001, HttpStatus.BAD_REQUEST, { value: property });
  }
}

@ValidatorConstraint({ name: 'isString' })
@Injectable()
export class IsString implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_000_0007, HttpStatus.BAD_REQUEST, { value: property });
    }

    if (typeof value === 'string') {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_001_0002, HttpStatus.BAD_REQUEST, { value: property });
  }
}

const NUMBER_RULE = /^[0-9]*$/;

@ValidatorConstraint({ name: 'isStringNumber' })
@Injectable()
export class IsStringNumber implements ValidatorConstraintInterface {
  validate(value: any, validationArguments: ValidationArguments): boolean {
    const property = validationArguments.property;
    if (!value) {
      throw new ClientRequestException(ERROR_CODE.ERR_000_0007, HttpStatus.BAD_REQUEST, { value: property });
    }

    if (typeof value === 'string' && NUMBER_RULE.test(value)) {
      return true;
    }

    throw new ClientRequestException(ERROR_CODE.ERR_001_0001, HttpStatus.BAD_REQUEST, { value: property });
  }
}
