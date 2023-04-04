import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ObjectMap } from '@common';

import { CreateUserDto } from './dto';
import { User, UserDocument } from './schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<void> {
    await this.userModel.create(user);
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async exists(filter: ObjectMap): Promise<boolean> {
    return !!(await this.userModel.exists(filter));
  }
}
