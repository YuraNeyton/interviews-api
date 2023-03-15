import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole } from '../../../common';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({
    unique: true,
    default: UserRole.USER
  })
  value: UserRole;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
