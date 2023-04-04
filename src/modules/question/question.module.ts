import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from '@common';

import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question, QuestionSchema } from './schemas';
import { TitleAlreadyExists } from './validations';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema, collection: 'questions' }
    ])
  ],
  controllers: [QuestionController],
  providers: [QuestionService, TitleAlreadyExists],
  exports: [QuestionService]
})
export class QuestionModule {}
