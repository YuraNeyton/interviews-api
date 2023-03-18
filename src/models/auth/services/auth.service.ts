import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import {
  TokenType,
  UserRole,
  HashService,
  JwtService
} from '../../../common';

import { UserService } from '../../user';

import { SignInDto, SignUpDto } from '../dto';
import { AccessToken, AuthorizationTokens } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService
  ) {
  }

  async signUp({ email, password }: SignUpDto): Promise<void> {
    try {
      const hashedPassword = await this.hashService.hashPassword(password);
      await this.userService.create({ email, password: hashedPassword, roles: [UserRole.USER] });
    } catch (error) {
      throw new InternalServerErrorException();
    }
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

    const payload = { id: foundUser.id, roles: foundUser.roles };

    const accessToken = this.jwtService.generateToken(payload, TokenType.ACCESS);
    const refreshToken = this.jwtService.generateToken(payload, TokenType.REFRESH);

    return { accessToken, refreshToken };
  }

  async refresh(token: string): Promise<AccessToken> {
    try {
      const { exp, ...tokenPayloadWithoutExp } = this.jwtService.validate(token, TokenType.REFRESH);
      const accessToken = this.jwtService.generateToken(tokenPayloadWithoutExp, TokenType.ACCESS);

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
