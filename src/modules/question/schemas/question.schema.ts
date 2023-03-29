import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

import { DevelopmentDirection, LevelOfPreparation } from '../../../common';
import { Category } from '../../category';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];

  @Prop()
  levelOfPreparation: LevelOfPreparation[];

  @Prop()
  developmentDirection: DevelopmentDirection[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
