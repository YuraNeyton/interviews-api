import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from '../../common';

import { Category, CategorySchema } from './schemas';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule
      .forFeature([
        { name: Category.name, schema: CategorySchema, collection: 'categories' }
      ])
  ],
  providers: [
    CategoryService
  ],
  controllers: [CategoryController]
})
export class CategoryModule {
}
