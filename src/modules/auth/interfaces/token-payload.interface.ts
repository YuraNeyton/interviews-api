import { UserRole } from '@common';

export interface TokenPayload {
  id: string;

  iat?: number;

  exp?: number;
  roles?: UserRole[];
}
