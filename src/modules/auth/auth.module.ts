import { Module } from '@nestjs/common';

import { CommonModule } from '@common';

import { QuestionModule } from '../question';
import { UserModule } from '../user';

import { AuthController } from './auth.controller';
import { AuthService } from './services';

@Module({
  imports: [QuestionModule, CommonModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
