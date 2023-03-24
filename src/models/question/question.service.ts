import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Aggregate } from 'mongoose';

import { ObjectMap } from '../../common';

import { CreateQuestion, UpdateQuestion } from './dto';
import { Question, QuestionDocument } from './schemas';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>) {
  }

  async create(question: CreateQuestion): Promise<void> {
    await this.questionModel.create(question);
  }

  async update(_id: Types.ObjectId, valuesToUpdate: UpdateQuestion): Promise<void> {
    await this.questionModel.updateOne({ _id }, valuesToUpdate);
  }

  async findAll(): Promise<Aggregate<Question[]>> {
    return this.questionModel.aggregate([
      {
        '$lookup': {
          'from': 'categories',
          'localField': 'categories',
          'foreignField': '_id',
          'as': 'categories'
        }
      }
    ]);
  }

  async findOneById(_id: Types.ObjectId): Promise<Aggregate<QuestionDocument | null>> {
    const [fountQuestion] = await this.questionModel.aggregate([
      {
        $match: { _id }
      },
      {
        '$lookup': {
          'from': 'categories',
          'localField': 'categories',
          'foreignField': '_id',
          'as': 'categories'
        }
      }
    ]);
    return fountQuestion || null;
  }

  async exists(filter: ObjectMap): Promise<boolean> {
    return !!await this.questionModel.exists(filter);
  }

  async remove(filter: ObjectMap): Promise<void> {
    return this.questionModel.remove(filter);
  }
}
