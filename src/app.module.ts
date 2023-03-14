import { Module } from '@nestjs/common';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication';


@Module({
  imports: [
    AuthenticationModule,
    AppRoutingModule
  ]
})
export class AppModule {
}
