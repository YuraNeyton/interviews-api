import { Module } from '@nestjs/common';

import { CommonModule } from '../../common';

import { CategoryController } from './category.controller';

@Module({
  imports: [CommonModule],
  providers: [],
  controllers: [CategoryController]
})
export class CategoryModule {
}
