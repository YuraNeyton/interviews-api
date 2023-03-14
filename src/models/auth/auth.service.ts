import { Injectable } from '@nestjs/common';

import { UserService } from '../user';
import { SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async signUp(credentials: SignUpDto): Promise<void> {
    await this.userService.create(credentials);
  }
}
