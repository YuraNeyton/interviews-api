import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
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
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './schemas';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful create' })
  @ApiForbiddenResponse({ description: 'No access, missing token, or invalid role' })
  @ApiBadRequestResponse({ description: 'The category did not pass validation' })
  @ApiInternalServerErrorResponse({ description: 'Some database problem, such as a broken connection' })
  async create(@Body() category: CreateCategoryDto): Promise<void> {
    await this.categoryService.create(category);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful get all categories', type: ApiResponse<Category[]> })
  @ApiInternalServerErrorResponse({ description: 'Some database problem, such as a broken connection' })
  @ApiForbiddenResponse({ description: 'No access, missing token, or invalid role' })
  async findAll(): Promise<ApiResponse<Category[]>> {
    return {
      data: await this.categoryService.findAll()
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful token regeneration' })
  @ApiForbiddenResponse({ description: 'The refresh token may be invalid' })
  @ApiBadRequestResponse({ description: 'The category did not pass validation' })
  @ApiInternalServerErrorResponse({ description: 'Some database problem, such as a broken connection' })
  async update(@Param('id', ParseObjectId) id: Types.ObjectId, @Body() category: UpdateCategoryDto): Promise<void> {
    await this.categoryService.update(id, category);
  }
}
