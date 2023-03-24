import { IsString, MinLength } from 'class-validator';

import { IsNameAlreadyExists } from '../decorators';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  @IsNameAlreadyExists()
  name: string;
}
