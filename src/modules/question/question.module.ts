import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from '../../common';

import { Question, QuestionSchema } from './schemas';
import { TitleAlreadyExists } from './validations';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule
      .forFeature([
        { name: Question.name, schema: QuestionSchema, collection: 'questions' }
      ])
  ],
  controllers: [QuestionController],
  providers: [QuestionService, TitleAlreadyExists],
  exports: [QuestionService]
})
export class QuestionModule {
}
