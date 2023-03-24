import { IsString, MinLength } from 'class-validator';

export class UpdateCategory {
  @IsString()
  @MinLength(4)
  name: string;
}
