import { Module } from '@nestjs/common';

import { AuthenticationController } from './authentication.controller';

@Module({
  providers: [],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
