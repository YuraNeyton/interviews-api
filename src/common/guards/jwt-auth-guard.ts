import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';

import { TokenType } from '../enums';
import { JwtService } from '../services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.get('Authorization');

    if (!authorization) {
      throw new BadRequestException();
    }
    const [, token] = authorization.split(' ');

    try {
      const { roles } = this.jwtService.validate(token, TokenType.ACCESS);
      request.userRoles = roles;

      return true;
    } catch (error) {
      return false;
    }
  }
}
