// eslint-disable-next-line max-classes-per-file
import { JwtTypes } from '../../modules/auth/types/auth-types.enum';
import { UserEntity } from '../../modules/database/entities/user.entity';

export class JwtExtract {
  user: UserEntity;
  type: JwtTypes;
}

export class JwtPayload {
  uid: number;
  type: JwtTypes;
  iat: Date;
}

export type GeneratedToken = string;
