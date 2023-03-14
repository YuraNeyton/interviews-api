import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { AuthenticationModule } from './authentication';

const ROUTES: Routes = [
  {
    path: 'api', children: [
      { path: 'auth', module: AuthenticationModule }
    ]
  }
];

@Module({
  imports: [
    RouterModule.register(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
