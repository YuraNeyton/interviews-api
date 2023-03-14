import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { AuthModule } from '../auth';

const ROUTES: Routes = [
  { path: 'auth', module: AuthModule }
];

@Module({
  imports: [
    RouterModule.register(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
