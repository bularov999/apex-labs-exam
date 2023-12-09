import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';

export class UserExceptions {
  static isUserExistsAndLocked(
    user: UserEntity | undefined | null,
  ): UserEntity {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.is_locked) {
      throw new BadRequestException(`User with id ${user.id} is locked`);
    }

    return user;
  }
}
