import { registerDecorator, ValidationOptions } from 'class-validator';

import { EmailAlreadyExists } from './validations';

export const IsEmailAlreadyExists = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsEmailAlreadyExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: EmailAlreadyExists
    });
  };
};
