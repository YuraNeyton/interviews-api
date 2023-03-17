import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestionService } from './question.service';

import { Question, QuestionSchema } from './schemas';

@Module({
  imports: [
    MongooseModule
      .forFeature([
        { name: Question.name, schema: QuestionSchema, collection: 'questions' }
      ])
  ],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {
}
