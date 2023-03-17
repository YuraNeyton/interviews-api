import {
  Body,
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  InternalServerErrorException
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse
} from '@nestjs/swagger';

import { ApiResponse, JwtAuthGuard } from '../../common';

import { CreateCategoryDto } from './dto';
import { Category } from './schemas';

@Controller()
export class CategoryController {
  // constructor(private authService: AuthService) {
  // }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Successful save' })
  @ApiForbiddenResponse({ description: 'No access, missing token, or invalid role' })
  @ApiBadRequestResponse({ description: 'The category did not pass validation' })
  @ApiInternalServerErrorResponse({ description: 'Some database problem, such as a broken connection' })
  async save(@Body() category: CreateCategoryDto): Promise<void> {
    try {
      // await this.authService.signUp(credentials);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Successful get all categories', type: ApiResponse<Category[]> })
  @ApiInternalServerErrorResponse({ description: 'Some database problem, such as a broken connection' })
  @ApiForbiddenResponse({ description: 'No access, missing token, or invalid role' })
  async getAll(): Promise<ApiResponse<any>> {
    try {
      // const authorizationTokens = await this.authService.signIn(credentials);
      return {
        data: {}
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Successful token regeneration' })
  @ApiForbiddenResponse({ description: 'The refresh token may be invalid' })
  @ApiBadRequestResponse({ description: 'The category did not pass validation' })
  @ApiInternalServerErrorResponse({ description: 'Some database problem, such as a broken connection' })
  async update(): Promise<ApiResponse<any>> {
    try {
      // const accessToken = await this.authService.refresh(refresh);
      return {
        data: {}
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
