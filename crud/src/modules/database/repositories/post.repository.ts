import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/base/base.repository';
import { PostEntity } from '../entities/post.entity';
import { FindAllPostsRequestDto } from '../../post/dtos/request/find-all-posts.dto';
import { EntityNames } from '../../../shared/enums/entity-names.enum';
import { FindFilterQuery } from '../../../shared/utils/find-query-filter';
import { PostSortKeys } from '../../post/types/post.types';

@Injectable()
export class PostRepository extends BaseRepository<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    protected readonly repository: Repository<PostEntity>,
  ) {
    super();
  }

  public async findById(id: number): Promise<PostEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async findOneOrFail(
    criteria: FindOneOptions<PostEntity>,
  ): Promise<PostEntity> {
    const Post = await this.repository.findOne(criteria);

    if (!Post) {
      throw new NotFoundException('Post not found');
    }

    return Post;
  }

  public async findAllPosts(
    payload: FindAllPostsRequestDto,
  ): Promise<[PostEntity[], number]> {
    const { id, limit, page, select, sort, sortType, text, title } = payload;

    const post = EntityNames.POST;
    const query = this.repository.createQueryBuilder(post);

    const filterQuery = new FindFilterQuery<PostEntity>(query);

    return filterQuery
      .select(select)
      .setWhere({ col: post, id })
      .setSearch<PostEntity>({ title, col: post })
      .setSearch<PostEntity>({ text, col: post })
      .sort<PostSortKeys>(post, sort, sortType)
      .getPagination({ page, limit })
      .getManyAndCount();
  }
}
