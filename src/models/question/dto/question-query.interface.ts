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

import { DevelopmentDirection, LevelOfPreparation } from '../../../common';

export class QuestionQuery {
  @IsOptional()
  @Transform((limit) => parseInt(limit.value), { toClassOnly: true })
  limit: number = 20;

  @IsOptional()
  @Transform(offset => parseInt(offset.value), { toClassOnly: true })
  offset: number = 0;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  categories: Types.ObjectId[];

  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(LevelOfPreparation, { each: true })
  levelOfPreparation: LevelOfPreparation[];

  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(DevelopmentDirection, { each: true })
  developmentDirection: DevelopmentDirection[];
}
