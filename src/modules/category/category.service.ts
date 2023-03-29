import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ObjectMap } from '../../common';

import { CreateCategory, UpdateCategory } from './dto';
import { Category, CategoryDocument } from './schemas';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async create(category: CreateCategory): Promise<CategoryDocument> {
    return this.categoryModel.create(category);
  }

  async update(
    _id: Types.ObjectId,
    valuesToUpdate: UpdateCategory
  ): Promise<void> {
    await this.categoryModel.updateOne({ _id }, valuesToUpdate);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({});
  }

  async findOneById(id: Types.ObjectId): Promise<CategoryDocument | null> {
    return this.categoryModel.findById(id);
  }

  async exists(filter: ObjectMap): Promise<boolean> {
    return !!(await this.categoryModel.exists(filter));
  }

  async remove(filter: ObjectMap): Promise<void> {
    return this.categoryModel.remove(filter);
  }
}
