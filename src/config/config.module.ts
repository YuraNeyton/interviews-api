import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig } from './app';
import { mongoDbConfig } from './database';
import { jwtConfig } from './session';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mongoDbConfig, jwtConfig]
    })
  ]
})
export class MyConfigModule {
}
