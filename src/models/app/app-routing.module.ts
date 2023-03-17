import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { AuthModule } from '../auth';
import { CategoryModule } from '../category';

const ROUTES: Routes = [
  { path: 'auth', module: AuthModule },
  { path: 'categories', module: CategoryModule }
];

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    RouterModule.register(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
