import {
  TransformID,
  TransformQueryArray,
  TransformString,
} from '../../../../shared/decorators/validate.decorator';
import { PaginationQueryType } from '../../../../shared/types/pagination.type';
import { IsSortKeyExists } from '../../../../shared/validators/is-sort-key-exists.validator';
import { postSelectKeys, postSortKeys } from '../../constants/post.constants';
import { PostSortKeys } from '../../types/post.types';
import { IsArrayUnique } from '../../../../shared/validators/is-array-unique.validator';
import { IsSelectExists } from '../../../../shared/validators/is-select-exists.validator';

export class FindAllPostsRequestDto extends PaginationQueryType {
  @TransformID({ nullable: true })
  id?: number;

  @TransformString({ nullable: true })
  title?: string;

  @TransformString({ nullable: true })
  text?: string;

  @TransformQueryArray(String, { nullable: true })
  @IsArrayUnique()
  @IsSelectExists(postSelectKeys)
  select: string[] = [...postSelectKeys];

  @TransformString()
  @IsSortKeyExists<PostSortKeys>(postSortKeys)
  sort: PostSortKeys;
}
