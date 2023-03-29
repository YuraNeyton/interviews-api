import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse
} from '@nestjs/swagger';
import { Types } from 'mongoose';

import {
  ApiResponse,
  JwtAuthGuard,
  RoleGuard,
  UserRole,
  ParseObjectId
} from '../../common';

import { CategoryService } from './category.service';
import { CreateCategory, UpdateCategory } from './dto';
import { IsCategoryExists } from './pipes';
import { Category } from './schemas';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful create' })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  @ApiBadRequestResponse({
    description: 'The category did not pass validation'
  })
  async create(
    @Body() category: CreateCategory
  ): Promise<ApiResponse<Category>> {
    return {
      data: await this.categoryService.create(category)
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({
    description: 'Successful get all categories',
    type: ApiResponse<Category[]>
  })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  async findAll(): Promise<ApiResponse<Category[]>> {
    return {
      data: await this.categoryService.findAll()
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful update' })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  @ApiBadRequestResponse({
    description: 'The category did not pass validation, or id doesnt exists'
  })
  async update(
    @Param('id', ParseObjectId, IsCategoryExists) id: Types.ObjectId,
    @Body() category: UpdateCategory
  ): Promise<void> {
    await this.categoryService.update(id, category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful remove' })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  @ApiNotFoundResponse({ description: 'The id of category doesnt exists' })
  async remove(
    @Param('id', ParseObjectId, IsCategoryExists) _id: Types.ObjectId
  ): Promise<void> {
    await this.categoryService.remove({ _id });
  }
}
