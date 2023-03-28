import {
  Injectable,
  ArgumentMetadata,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { Types } from 'mongoose';

import { QuestionService } from '../question.service';

@Injectable()
export class IsQuestionExists implements PipeTransform {

  constructor(private questionService: QuestionService) {
  }

  async transform(_id: Types.ObjectId, metadata: ArgumentMetadata): Promise<Types.ObjectId> {
    const isExists = await this.questionService.exists({ _id });
    if (!isExists) {
      throw new NotFoundException();
    }

    return _id;
  }
}
