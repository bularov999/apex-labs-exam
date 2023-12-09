import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntityModel } from '../../../shared/base/base.entity';
import { EntityNames } from '../../../shared/enums/entity-names.enum';

@Entity(EntityNames.POST)
export class PostEntity extends BaseEntityModel {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  text: string;
}
