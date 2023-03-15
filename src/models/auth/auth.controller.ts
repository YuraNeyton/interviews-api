import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

import { ApiResponse, BadRequestException, NotFoundException } from '../../common';

import { SignInDto, SignUpDto } from './dto';
import { AuthorizationTokens } from './interfaces';
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
  @ApiOkResponse({ description: 'Successful signIn' })
  @ApiNotFoundResponse({ description: 'Login or password do not match' })
  async signIn(@Body() credentials: SignInDto): Promise<ApiResponse<AuthorizationTokens>> {
    try {
      const authorizationTokens = await this.authService.signIn(credentials);
      return {
        data: authorizationTokens
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }
}
