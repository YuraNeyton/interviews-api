import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'IsEmailAlreadyExists', async: true })
@Injectable()
export class EmailAlreadyExists implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {
  }

  async validate(email: string): Promise<boolean> {
    return this.userService.isEmailExist(email);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'This email already exists';
  }
}
