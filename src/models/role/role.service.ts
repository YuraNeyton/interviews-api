import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRole } from '../../common';

import { Role, RoleDocument } from './schemas';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {
  }

  async findOne(value: UserRole): Promise<RoleDocument> {
    return this.roleModel.findOne({ value });
  }
}
