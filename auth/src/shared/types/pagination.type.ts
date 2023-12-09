import { IsOptional } from 'class-validator';
import { BaseEntityModel } from '../base/base.entity';
import { TransformEnum, TransformInt } from '../decorators/validate.decorator';
import { SortType } from '../enums/entity-sort.enum';

export class PaginationQueryType {
  @TransformInt({ nullable: false })
  limit = 100;

  @TransformInt({ nullable: true })
  page = 1;

  @TransformEnum(SortType, { nullable: true })
  sortType: SortType = SortType.ASC;

  @IsOptional()
  sort: unknown = 'id';

  @IsOptional()
  select: unknown[] = [];
}

export type SortKeyType = Pick<BaseEntityModel, 'id' | 'created' | 'updated'>;
