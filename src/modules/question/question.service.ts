import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, Model, Types } from 'mongoose';

import { ObjectMap } from '@common';

import { CreateQuestion, QuestionQuery, UpdateQuestion } from './dto';
import { Question, QuestionDocument } from './schemas';

type AggregateWithTotal = { data: Question[]; total: number };

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {}

  async create(question: CreateQuestion): Promise<QuestionDocument> {
    return this.questionModel.create(question);
  }

  async update(
    _id: Types.ObjectId,
    valuesToUpdate: UpdateQuestion
  ): Promise<void> {
    await this.questionModel.updateOne({ _id }, valuesToUpdate);
  }

  async findAll(query: QuestionQuery): Promise<AggregateWithTotal> {
    const pipeline = this.questionModel.aggregate();

    if (query.title) {
      pipeline.match({
        title: new RegExp(`.*${query.title}.*`, 'i')
      });
    }

    if (query.categories) {
      pipeline.match({
        categories: {
          $in: query.categories.map((el) => new Types.ObjectId(el))
        }
      });
    }

    if (query.levelOfPreparation) {
      pipeline.match({ levelOfPreparation: { $in: query.levelOfPreparation } });
    }

    if (query.developmentDirection) {
      pipeline.match({
        developmentDirection: { $in: query.developmentDirection }
      });
    }

    pipeline.lookup({
      from: 'categories',
      localField: 'categories',
      foreignField: '_id',
      as: 'categories'
    });

    pipeline.facet({
      paginatedResults: [
        { $skip: query.offset },
        { $limit: query.offset + query.limit }
      ],
      totalCount: [
        {
          $count: 'count'
        }
      ]
    });

    const [data] = await pipeline;
    const { paginatedResults, totalCount } = data;
    const [total] = totalCount;

    return { data: paginatedResults, total: total?.count || 0 };
  }

  async findOneById(
    _id: Types.ObjectId
  ): Promise<Aggregate<QuestionDocument | null>> {
    const [fountQuestion] = await this.questionModel.aggregate([
      {
        $match: { _id }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      }
    ]);
    return fountQuestion || null;
  }

  async exists(filter: ObjectMap): Promise<boolean> {
    return !!(await this.questionModel.exists(filter));
  }

  async remove(filter: ObjectMap): Promise<void> {
    return this.questionModel.remove(filter);
  }
}
