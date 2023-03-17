import {
  Injectable,
  mixin,
  CanActivate,
  ExecutionContext,
  Type
} from '@nestjs/common';

import { UserRole } from '../enums';

export const RoleGuard = (role: UserRole): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean {
      const request = ctx.switchToHttp().getRequest();

      return request.userRoles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
