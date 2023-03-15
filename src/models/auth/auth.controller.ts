import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './services';
import { SignUpDto } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signUp')
  @ApiOkResponse({ description: 'successful registration' })
  @ApiBadRequestResponse({ description: 'this email already exists or invalid format of email' })
  async signUp(@Body() credentials: SignUpDto): Promise<void> {
    try {
      await this.authService.signUp(credentials);
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('signIn')
  signIn(): string {
    return 'signIn';
  }
}
