import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from '../auth/dtos/request/register-request.dto';
import { UserRepository } from '../database/repositories/user.repository';

@Injectable()
export class UsersSeedCommander {
  constructor(private readonly userRepository: UserRepository) {}

  @Command({
    command: 'create:users',
    describe: 'create seed users',
  })
  async createAdmin(): Promise<void> {
    const mocks: RegisterRequestDto[] = [
      {
        email: 'test1@mail.ru',
        password: 'test',
      },
      {
        email: 'test2@mail.ru',
        password: 'test',
      },
      {
        email: 'test3@mail.ru',
        password: 'test',
      },
    ];

    await this.userRepository.save(mocks);
  }
}
