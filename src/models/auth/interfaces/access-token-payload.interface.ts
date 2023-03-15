import { Role } from '../../role';

export interface AccessTokenPayload {
  id: string;

  iat?: number;

  exp?: number;
  roles: Role[];
}
