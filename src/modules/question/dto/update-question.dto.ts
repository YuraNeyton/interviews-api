import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';
import { Types } from 'mongoose';

import { DevelopmentDirection, LevelOfPreparation } from '@common';

export class UpdateQuestion {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  body: string;

  @ApiProperty({ isArray: true, type: 'string' })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  categories: Types.ObjectId[];

  @ApiProperty({ enum: LevelOfPreparation })
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(LevelOfPreparation, { each: true })
  levelOfPreparation: LevelOfPreparation[];

  @ApiProperty({ enum: DevelopmentDirection })
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(DevelopmentDirection, { each: true })
  developmentDirection: DevelopmentDirection[];
}
