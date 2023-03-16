import {
  Body,
  Controller,
  Post,
  BadRequestException,
  ForbiddenException,
  NotFoundException
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse
} from '@nestjs/swagger';

import { ApiResponse } from '../../common';

import { SignInDto, SignUpDto } from './dto';
import { AccessToken, AuthorizationTokens } from './interfaces';
import { GetJwt } from './decorators';
import { AuthService } from './services';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signUp')
  @ApiOkResponse({ description: 'Successful registration' })
  @ApiBadRequestResponse({ description: 'This email already exists or invalid format of email' })
  async signUp(@Body() credentials: SignUpDto): Promise<void> {
    try {
      await this.authService.signUp(credentials);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('signIn')
  @ApiOkResponse({ description: 'Successful signIn', type: ApiResponse<AuthorizationTokens> })
  @ApiNotFoundResponse({ description: 'Login or password do not match' })
  async signIn(@Body() credentials: SignInDto): Promise<ApiResponse<AccessToken>> {
    try {
      const authorizationTokens = await this.authService.signIn(credentials);
      return {
        data: authorizationTokens
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('refresh')
  @ApiOkResponse({ description: 'Successful token regeneration' })
  @ApiForbiddenResponse({ description: 'The refresh token may be invalid' })
  async refresh(@GetJwt() refresh: string): Promise<ApiResponse<AccessToken>> {
    try {
      const accessToken = await this.authService.refresh(refresh);
      return {
        data: accessToken
      };
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
