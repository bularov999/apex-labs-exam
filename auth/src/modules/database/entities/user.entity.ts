import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntityModel } from '../../../shared/base/base.entity';
import { EntityNames } from '../../../shared/enums/entity-names.enum';
import { encryptPassword } from '../../../shared/utils/hash-password';
import { UserRoles } from '../../auth/enums/auth.enums';

@Entity(EntityNames.USER)
export class UserEntity extends BaseEntityModel {
  @ApiProperty({ type: String, example: 'E-commerce@mail.com' })
  @Column({ type: 'varchar' })
  email: string;

  @Column({ nullable: true, select: false })
  password: string;

  @ApiProperty({ type: String, enum: UserRoles, default: UserRoles.USER })
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column('bigint', {
    array: true,
    default: [],
  })
  login_attempts: number[];

  @ApiProperty({ type: Boolean, default: false })
  @Column({ type: 'boolean', default: false })
  is_locked: boolean;

  // validation
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await encryptPassword(this.password);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validateUniqueName(): Promise<void> {
    if (!this.deleted_at) {
      const existingEntity = await UserEntity.findOne({
        where: { email: this.email },
      });

      // if (existingEntity && existingEntity.id) {
      if (existingEntity && existingEntity.id !== this.id) {
        throw new InternalServerErrorException('Email must be unique');
      }
    }
  }
}
