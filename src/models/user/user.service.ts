import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto';
import { User, UserDocument } from './schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async create(user: CreateUserDto): Promise<void> {
    await this.userModel.create(user);
  }

  async isEmailExist(email: string): Promise<boolean> {
    return !await this.findOneByEmail(email);
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }
}
