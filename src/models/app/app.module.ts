import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { appConfig } from '../../config';

import { AuthModule } from '../auth';
import { AppRoutingModule } from './app-routing.module';

@Module({
  imports: [
    AuthModule,
    AppRoutingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb_uri')
      }),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {
}