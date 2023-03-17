import { UserRole } from '../../../common';

export class CreateCategoryDto {
  email: string;
  password: string;

  roles: UserRole[];
}
