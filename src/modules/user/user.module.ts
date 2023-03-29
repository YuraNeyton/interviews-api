import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas';
import { UserService } from './user.service';
import { EmailAlreadyExists } from './validations';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' }
    ])
  ],
  providers: [UserService, EmailAlreadyExists],
  exports: [UserService, EmailAlreadyExists]
})
export class UserModule {}
