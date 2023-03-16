import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

import { IsEmailAlreadyExists } from '../decorators';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  @IsEmailAlreadyExists()
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}
