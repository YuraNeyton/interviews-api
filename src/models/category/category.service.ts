import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category, CategoryDocument } from './schemas';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {
  }

  async create(category: CreateCategoryDto): Promise<void> {
    await this.categoryModel.create(category);
  }

  async update(_id: Types.ObjectId, valuesToUpdate: UpdateCategoryDto): Promise<void> {
    await this.categoryModel.updateOne({ _id }, valuesToUpdate);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({});
  }
}
