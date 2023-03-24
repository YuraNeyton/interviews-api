import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { CategoryService } from '../category.service';

@ValidatorConstraint({ name: 'IsNameAlreadyExists', async: true })
@Injectable()
export class NameAlreadyExists implements ValidatorConstraintInterface {
  constructor(private categoryService: CategoryService) {
  }

  async validate(name: string): Promise<boolean> {
    return this.categoryService.isNameExist(name);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'This category name already exists';
  }
}
