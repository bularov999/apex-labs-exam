import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../database/entities/user.entity';

export class RegisterResponseDto {
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  access_token: string;

  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refresh_token: string;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;
}
