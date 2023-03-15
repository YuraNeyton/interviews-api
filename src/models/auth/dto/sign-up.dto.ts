import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { IsEmailAlreadyExists } from '../decorators';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  @IsEmailAlreadyExists()
  email: string;
  @ApiProperty()
  password: string;
}
