import {
  Injectable,
  ArgumentMetadata,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { Types } from 'mongoose';

import { CategoryService } from '../category.service';

@Injectable()
export class IsCategoryExists implements PipeTransform {

  constructor(private categoryService: CategoryService) {
  }

  async transform(id: Types.ObjectId, metadata: ArgumentMetadata): Promise<Types.ObjectId> {
    const foundCategory = await this.categoryService.findOneById(id);

    if (!foundCategory) {
      throw new NotFoundException();
    }

    return id;
  }
}
