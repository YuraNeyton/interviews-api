import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

import { CategoryService } from '../category.service';

@Injectable()
export class IsCategoryExists implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(_id: Types.ObjectId): Promise<Types.ObjectId> {
    const isExists = await this.categoryService.exists({ _id });

    if (!isExists) {
      throw new NotFoundException();
    }

    return _id;
  }
}
