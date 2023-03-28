import { registerDecorator, ValidationOptions } from 'class-validator';

import { TitleAlreadyExists } from '../validations';

export const IsTitleAlreadyExists = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsTitleAlreadyExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TitleAlreadyExists
    });
  };
};
