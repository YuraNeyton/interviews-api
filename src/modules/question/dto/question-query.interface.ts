import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString
} from 'class-validator';
import { Types } from 'mongoose';

import { DevelopmentDirection, LevelOfPreparation } from '@common';

export class QuestionWithoutAttributesQuery {
  @IsOptional()
  @Transform((limit) => parseInt(limit.value), { toClassOnly: true })
  limit = 1000;

  @IsOptional()
  @Transform((offset) => parseInt(offset.value), { toClassOnly: true })
  offset = 0;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  categories?: Types.ObjectId[];

  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(LevelOfPreparation, { each: true })
  levelOfPreparation?: LevelOfPreparation[];

  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(DevelopmentDirection, { each: true })
  developmentDirection?: DevelopmentDirection[];
}

export class QuestionQuery extends QuestionWithoutAttributesQuery {
  @IsOptional()
  @ArrayNotEmpty()
  @IsString()
  attributes?: string[];
}
