import { UserRole } from '@common';

export interface CreateUserDto {
  email: string;
  password: string;

  roles: UserRole[];
}
