import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from '../post/dtos/request/create-post.dto';
import { PostRepository } from '../database/repositories/post.repository';

@Injectable()
export class PostSeedCommander {
  constructor(private readonly postRepository: PostRepository) {}

  @Command({
    command: 'create:posts',
    describe: 'create seed posts',
  })
  async createAdmin(): Promise<void> {
    const data: CreatePostRequestDto[] = [
      {
        text: 'text1',
        title: 'title1',
      },
      {
        text: 'text2',
        title: 'title2',
      },
      {
        text: 'text3',
        title: 'title3',
      },
    ];

    await this.postRepository.save(data);
  }
}
