import { Module } from '@nestjs/common';

import { RoleModule } from '../role';
import { UserModule } from '../user';

import { AuthController } from './auth.controller';
import { EmailAlreadyExists } from './decorators';
import { AuthService, HashService } from './services';

@Module({
  imports: [UserModule, RoleModule],
  providers: [AuthService, HashService, EmailAlreadyExists],
  controllers: [AuthController]
})
export class AuthModule {
}
