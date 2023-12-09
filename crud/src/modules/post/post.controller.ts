import { Body, Param, Query, UseGuards } from '@nestjs/common';
import { routes } from '../../configs/routes.config';
import { ControllerDecorator } from '../../shared/decorators/controller.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import {
  DeleteDecorator,
  GetDecorator,
  PostDecorator,
  PutDecorator,
} from '../../shared/decorators/method.decorator';
import { PostEntity } from '../database/entities/post.entity';
import { PostService } from './post.service';
import { PostParamsDto } from './dtos/request/post-params.dto';
import { UpdatePostRequestDto } from './dtos/request/update-post.dto';
import { FindAllEntityResponseDto } from '../../shared/dto/find-all-entity.dto';
import { FindAllPostsRequestDto } from './dtos/request/find-all-posts.dto';

@ControllerDecorator(routes.post.root)
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @PostDecorator(
    routes.post.create,
    'Route for creating posts',
    () => PostEntity,
  )
  public async create(@Body() createPostRequestDto): Promise<PostEntity> {
    return this.postService.create(createPostRequestDto);
  }

  @PutDecorator(routes.post.update, 'Route for updating post', () => PostEntity)
  public async update(
    @Param() params: PostParamsDto,
    @Body() updatePostDto: UpdatePostRequestDto,
  ): Promise<PostEntity> {
    return this.postService.update(params, updatePostDto);
  }

  @GetDecorator(
    routes.post.find,
    'Route to find all posts with filter and pagination',
    () => FindAllEntityResponseDto<PostEntity>,
  )
  public async findAll(
    @Query() findAllPostDto: FindAllPostsRequestDto,
  ): Promise<FindAllEntityResponseDto<PostEntity>> {
    return this.postService.findAll(findAllPostDto);
  }

  @GetDecorator(
    routes.post.findOne,
    'Route to find one post by id',
    () => PostEntity,
  )
  public async findOne(@Param() params: PostParamsDto): Promise<PostEntity> {
    return this.postService.findOneOrFail(params);
  }

  @DeleteDecorator(routes.post.delete, 'Route to delete one post by id')
  public async delete(@Param() params: PostParamsDto): Promise<void> {
    await this.postService.deleteOrFail(params);
  }
}
