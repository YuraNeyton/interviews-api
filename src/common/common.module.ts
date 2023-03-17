import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './guards';
import { HashService, JwtService } from './services';

@Module({
  imports: [],
  providers: [
    HashService,
    JwtService,
    JwtAuthGuard
  ],
  exports: [
    HashService,
    JwtService,
    JwtAuthGuard
  ]
})
export class CommonModule {
}
