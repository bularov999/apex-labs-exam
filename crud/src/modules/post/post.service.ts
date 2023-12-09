import { Injectable } from '@nestjs/common';
import { PostEntity } from '../database/entities/post.entity';
import { PostRepository } from '../database/repositories/post.repository';
import { IListResponse } from '../../shared/types/response.types';
import { PostParamsDto } from './dtos/request/post-params.dto';
import { UpdatePostRequestDto } from './dtos/request/update-post.dto';
import { CreatePostRequestDto } from './dtos/request/create-post.dto';
import { FindAllPostsRequestDto } from './dtos/request/find-all-posts.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(dto: CreatePostRequestDto): Promise<PostEntity> {
    const post = await this.postRepository.create({ ...dto });

    return post;
  }

  public async update(
    params: PostParamsDto,
    dto: UpdatePostRequestDto,
  ): Promise<PostEntity> {
    const existedPost = await this.postRepository.findOneOrFail({
      where: {
        id: params.id,
      },
    });

    const updatedPost = await this.postRepository.update(
      { id: existedPost.id },
      { ...existedPost, ...dto },
    );

    return updatedPost;
  }

  public async findAll(
    dto: FindAllPostsRequestDto,
  ): Promise<IListResponse<PostEntity>> {
    const [items, totalCount] = await this.postRepository.findAllPosts(dto);

    return {
      items,
      total_count: totalCount,
    };
  }

  public async findOneOrFail(params: PostParamsDto): Promise<PostEntity> {
    const post = await this.postRepository.findOneOrFail({
      where: {
        id: params.id,
      },
    });

    return post;
  }

  public async deleteOrFail(params: PostParamsDto): Promise<void> {
    const post = await this.postRepository.findOneOrFail({
      where: {
        id: params.id,
      },
    });

    await this.postRepository.delete([post.id]);
  }
}
