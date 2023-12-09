import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../../modules/auth/types/auth.types';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const { user } = ctx.switchToHttp().getRequest();

    return user;
  },
);
