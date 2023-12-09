import { PostSelectKeys, PostSortKeys } from '../types/post.types';

export const postSortKeys: PostSortKeys[] = [
  'id',
  'created',
  'updated',
  'title',
  'text',
];

export const postSelectKeys: PostSelectKeys[] = [
  'id',
  'created',
  'updated',
  'title',
  'text',
  'deleted_at',
];
