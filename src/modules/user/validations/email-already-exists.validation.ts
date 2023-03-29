import { Injectable } from '@nestjs/common';
import type { ValidatorConstraintInterface } from 'class-validator';
import { ValidatorConstraint } from 'class-validator';

import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'IsEmailAlreadyExists', async: true })
@Injectable()
export class EmailAlreadyExists implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(email: string): Promise<boolean> {
    return !(await this.userService.exists({ email }));
  }

  defaultMessage(): string {
    return 'This email already exists';
  }
}
