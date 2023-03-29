import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { AuthModule } from '../auth';
import { CategoryModule } from '../category';
import { QuestionModule } from '../question';

const ROUTES: Routes = [
  { path: 'auth', module: AuthModule },
  { path: 'categories', module: CategoryModule },
  { path: 'questions', module: QuestionModule }
];

@Module({
  imports: [AuthModule, CategoryModule, RouterModule.register(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
