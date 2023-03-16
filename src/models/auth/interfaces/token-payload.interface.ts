import { Role } from '../../role';

export interface TokenPayload {
  id: string;

  iat?: number;

  exp?: number;
  roles?: Role[];
}
