import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from '../../common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { IsCategoryExists } from './pipes';
import { Category, CategorySchema } from './schemas';
import { NameAlreadyExists } from './validations';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema, collection: 'categories' }
    ])
  ],
  providers: [CategoryService, IsCategoryExists, NameAlreadyExists],
  controllers: [CategoryController]
})
export class CategoryModule {}
