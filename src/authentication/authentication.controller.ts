import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthenticationController {

  @Get('/signUp')
  registration(): string {
    return 'signUp';
  }
}
