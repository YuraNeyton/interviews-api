import { Module } from '@nestjs/common';

import { MyConfigModule } from '../../config';
import { MongoDatabaseProviderModule } from '../../providers';

import { AppRoutingModule } from './app-routing.module';

@Module({
  imports: [
    AppRoutingModule,
    MyConfigModule,
    MongoDatabaseProviderModule
  ]
})
export class AppModule {
}
