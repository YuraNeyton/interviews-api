import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse
} from '@nestjs/swagger';

import { ApiResponse, GetJwt } from '../../common';

import { SignInDto, SignUpDto } from './dto';
import { AccessToken, AuthorizationTokens } from './interfaces';
import { AuthService } from './services';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signUp')
  @ApiOkResponse({ description: 'Successful registration' })
  @ApiBadRequestResponse({ description: 'This email already exists or invalid format of email' })
  async signUp(@Body() credentials: SignUpDto): Promise<void> {
    await this.authService.signUp(credentials);
  }

  @Post('signIn')
  @ApiOkResponse({ description: 'Successful signIn', type: ApiResponse<AuthorizationTokens> })
  @ApiNotFoundResponse({ description: 'Login or password do not match' })
  async signIn(@Body() credentials: SignInDto): Promise<ApiResponse<AccessToken>> {
    console.log(credentials);
    return {
      data: await this.authService.signIn(credentials)
    };
  }

  @Post('refresh')
  @ApiOkResponse({ description: 'Successful token regeneration' })
  @ApiForbiddenResponse({ description: 'The refresh token may be invalid' })
  async refresh(@GetJwt() refresh: string): Promise<ApiResponse<AccessToken>> {
    return {
      data: await this.authService.refresh(refresh)
    };
  }
}
