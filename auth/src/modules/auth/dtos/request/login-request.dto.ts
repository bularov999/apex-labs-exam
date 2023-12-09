import {
  TransformEmail,
  TransformString,
} from '../../../../shared/decorators/validate.decorator';

export class LoginRequestDto {
  @TransformEmail({ description: 'user email for authentication' })
  email: string;

  @TransformString({ description: 'user password for authentication' })
  password: string;
}
