import { registerDecorator, ValidationOptions } from 'class-validator';

import { NameAlreadyExists } from '../validations';

export const IsNameAlreadyExists = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNameAlreadyExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NameAlreadyExists
    });
  };
};
