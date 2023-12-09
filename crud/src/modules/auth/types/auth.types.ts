import { UserRoles } from '../enums/auth.enums';

export interface IUser {
  email: string;
  password: string;
  role: UserRoles;
  login_attempts: number[];
  is_locked: boolean;
}
