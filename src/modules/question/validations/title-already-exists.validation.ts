import { Injectable } from '@nestjs/common';
import type { ValidatorConstraintInterface } from 'class-validator';
import { ValidatorConstraint } from 'class-validator';

import { QuestionService } from '../question.service';

@ValidatorConstraint({ name: 'IsTitleAlreadyExists', async: true })
@Injectable()
export class TitleAlreadyExists implements ValidatorConstraintInterface {
  constructor(private questionService: QuestionService) {}

  async validate(title: string): Promise<boolean> {
    return !(await this.questionService.exists({ title }));
  }

  defaultMessage(): string {
    return 'The question with this title already exists';
  }
}
