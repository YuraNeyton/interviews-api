import { Injectable } from '@nestjs/common';

import { UserRole } from '../../../common';

import { RoleService } from '../../role';
import { UserService } from '../../user';

import { SignUpDto } from '../dto';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private roleService: RoleService
  ) {
  }

  async signUp({ email, password }: SignUpDto): Promise<void> {
    const userRole = await this.roleService.findOne(UserRole.USER);
    const hashedPassword = await this.hashService.hashPassword(password);
    await this.userService.create({ email, password: hashedPassword, roles: [userRole.value] });
  }
}
