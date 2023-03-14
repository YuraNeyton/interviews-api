import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signUp')
  @ApiOkResponse({ description: 'successful registration' })
  @ApiBadRequestResponse({ description: 'this email already exists or invalid format of email' })
  async signUp(@Body() credentials: SignUpDto): Promise<string> {
    await this.authService.signUp(credentials);
    return 'work';
  }

  @Get('signIn')
  signIn(): string {
    return 'signIn';
  }
}
