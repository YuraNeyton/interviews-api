import { Injectable, NotFoundException } from '@nestjs/common';

import { TokenType, UserRole } from '../../../common';

import { RoleService } from '../../role';
import { UserService } from '../../user';

import { SignInDto, SignUpDto } from '../dto';
import { AccessToken, AuthorizationTokens } from '../interfaces';
import { HashService } from './hash.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private roleService: RoleService,
    private jwtService: JwtService
  ) {
  }

  async signUp({ email, password }: SignUpDto): Promise<void> {
    const userRole = await this.roleService.findOne(UserRole.USER);
    const hashedPassword = await this.hashService.hashPassword(password);
    await this.userService.create({ email, password: hashedPassword, roles: [userRole.value] });
  }

  async signIn({ email, password }: SignInDto): Promise<AuthorizationTokens> {
    const foundUser = await this.userService.findOneByEmail(email);

    if (!foundUser) {
      throw new NotFoundException();
    }

    const isPasswordMatch = await this.hashService.comparePassword(password, foundUser.password);

    if (!isPasswordMatch) {
      throw new NotFoundException();
    }

    const accessToken = this.jwtService.generateToken(
      {
        id: foundUser.id,
        roles: foundUser.roles
      },
      TokenType.ACCESS
    );
    const refreshToken = this.jwtService.generateToken(
      { id: foundUser.id },
      TokenType.REFRESH
    );

    return { accessToken, refreshToken };
  }

  async refresh(token: string): Promise<AccessToken> {
    const { exp, ...tokenPayloadWithoutExp } = this.jwtService.validate(token, TokenType.REFRESH);
    const accessToken = this.jwtService.generateToken(tokenPayloadWithoutExp, TokenType.ACCESS);

    return { accessToken };
  }
}
