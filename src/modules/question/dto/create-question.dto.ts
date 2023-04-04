import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsString,
  MinLength
} from 'class-validator';
import { Types } from 'mongoose';

import { DevelopmentDirection, LevelOfPreparation } from '@common';

import { IsTitleAlreadyExists } from '../decorators';

export class CreateQuestion {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @IsTitleAlreadyExists()
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  body: string;

  @ApiProperty({ isArray: true, type: 'string' })
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  categories: Types.ObjectId[];

  @ApiProperty({ enum: LevelOfPreparation })
  @ArrayNotEmpty()
  @IsEnum(LevelOfPreparation, { each: true })
  levelOfPreparation: LevelOfPreparation[];

  @ApiProperty({ enum: DevelopmentDirection })
  @ArrayNotEmpty()
  @IsEnum(DevelopmentDirection, { each: true })
  developmentDirection: DevelopmentDirection[];
}
