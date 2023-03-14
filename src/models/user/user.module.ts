import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Role, RoleSchema, User, UserSchema } from './schemas';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule
      .forFeature([
        { name: User.name, schema: UserSchema, collection: 'users' },
        { name: Role.name, schema: RoleSchema, collection: 'roles' }
      ])
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
