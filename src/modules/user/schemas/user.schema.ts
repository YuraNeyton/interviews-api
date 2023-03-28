import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole } from '../../../common';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: UserRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);
