import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { DevelopmentDirection, LevelOfPreparation } from '../../../common';

import { Category } from '../../category';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }] })
  categories: Category[]

  @Prop()
  levelOfPreparation: LevelOfPreparation[];

  @Prop()
  developmentDirection: DevelopmentDirection[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
