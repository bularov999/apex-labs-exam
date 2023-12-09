import { SortKeyType } from '../../../shared/types/pagination.type';
import { PostEntity } from '../../database/entities/post.entity';

export type PostSortKeys = keyof (Pick<PostEntity, 'title' | 'text'> &
  SortKeyType);

export type PostSelectKeys = keyof Pick<
  PostEntity,
  'id' | 'title' | 'text' | 'created' | 'updated' | 'deleted_at'
>;
