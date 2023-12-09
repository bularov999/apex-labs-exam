import { ApiProperty } from '@nestjs/swagger';
import { IListResponse } from '../types/response.types';

export class FindAllEntityResponseDto<T> implements IListResponse<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  total_count: number;

  constructor(props: { items: T[]; totalCount: number }) {
    this.items = props.items;
    this.total_count = props.totalCount;
  }
}
