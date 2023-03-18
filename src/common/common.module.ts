import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './guards';
import { ParseObjectId } from './pipes';
import { HashService, JwtService } from './services';

@Module({
  imports: [],
  providers: [
    HashService,
    JwtService,
    JwtAuthGuard,
    ParseObjectId
  ],
  exports: [
    HashService,
    JwtService,
    JwtAuthGuard,
    ParseObjectId
  ]
})
export class CommonModule {
}
