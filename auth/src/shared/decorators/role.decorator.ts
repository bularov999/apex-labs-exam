import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../modules/auth/enums/auth.enums';

export const ROLES_KEY = 'roles';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Role = (roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
