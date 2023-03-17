import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  InternalServerErrorException
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse
} from '@nestjs/swagger';

import {
  ApiResponse,
  JwtAuthGuard,
  RoleGuard,
  UserRole
} from '../../common';

import { CreateCategoryDto } from './dto';
import { Category } from './schemas';

@Controller()
export class CategoryController {
  // constructor(private authService: AuthService) {
  // }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
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
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
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
  @UseGuards(JwtAuthGuard, RoleGuard(UserRole.ADMIN))
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
