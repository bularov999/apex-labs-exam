import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/base/base.repository';
import { EntityNames } from '../../../shared/enums/entity-names.enum';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  public async findById(id: number): Promise<UserEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByEmail(payload: {
    email: string;
  }): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { email: payload.email } });
  }

  async findOneOrFail(
    criteria: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.repository.findOne(criteria);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async getPasswordById(id: number): Promise<UserEntity> {
    return this.repository
      .createQueryBuilder(EntityNames.USER)
      .select('user.password')
      .where('user.id = :id', { id })
      .getOne() as Promise<UserEntity>;
  }
}
