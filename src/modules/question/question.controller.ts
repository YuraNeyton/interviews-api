import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery
} from '@nestjs/swagger';
import { Types } from 'mongoose';

import {
  ApiResponse,
  JwtAuthGuard,
  ParseObjectId,
  RoleGuard,
  UserRole
} from '@common';

import {
  CreateQuestion,
  QuestionQuery,
  QuestionWithoutAttributesQuery,
  UpdateQuestion
} from './dto';
import { IsQuestionExists } from './pipes';
import { QuestionService } from './question.service';
import { Question } from './schemas';

@Controller()
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful create' })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  @ApiBadRequestResponse({
    description: 'The question did not pass validation'
  })
  async create(
    @Body() question: CreateQuestion
  ): Promise<ApiResponse<Question>> {
    return {
      data: await this.questionService.create(question)
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ schema: new QuestionQuery() })
  @ApiOkResponse({
    description: 'Successful get all questions',
    type: ApiResponse<Question[]>
  })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  async findAll(
    @Query() query: QuestionQuery
  ): Promise<ApiResponse<Question[]>> {
    const { data, total } = await this.questionService.findAll(query);

    return {
      data,
      metadata: {
        total,
        limit: query.limit,
        offset: query.offset
      }
    };
  }

  @Get('preview')
  @ApiQuery({})
  @ApiOkResponse({
    description: 'Successful get all questions',
    type: ApiResponse<Question[]>
  })
  async preview(
    @Query() query: QuestionWithoutAttributesQuery
  ): Promise<ApiResponse<Question[]>> {
    const previewQuery = {
      ...query,
      attributes: ['title']
    };
    const { data, total } = await this.questionService.findAll(previewQuery);

    return {
      data,
      metadata: {
        total,
        limit: query.limit,
        offset: query.offset
      }
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Successful get questions by id',
    type: ApiResponse<Question>
  })
  @ApiForbiddenResponse({ description: 'No access, missing token' })
  @ApiNotFoundResponse({ description: 'The id of question doesnt exists' })
  async findById(
    @Param('id', ParseObjectId, IsQuestionExists) id: Types.ObjectId
  ): Promise<ApiResponse<Question>> {
    return {
      data: await this.questionService.findOneById(id)
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful update' })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  @ApiBadRequestResponse({
    description: 'The question did not pass validation, or id doesnt exists'
  })
  @ApiNotFoundResponse({ description: 'The id of question doesnt exists' })
  async update(
    @Param('id', ParseObjectId, IsQuestionExists) id: Types.ObjectId,
    @Body() question: UpdateQuestion
  ): Promise<void> {
    await this.questionService.update(id, question);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
  @ApiOkResponse({ description: 'Successful remove' })
  @ApiForbiddenResponse({
    description: 'No access, missing token, or invalid role'
  })
  @ApiNotFoundResponse({ description: 'The id of question doesnt exists' })
  async remove(
    @Param('id', ParseObjectId, IsQuestionExists) _id: Types.ObjectId
  ): Promise<void> {
    await this.questionService.remove({ _id });
  }
}
