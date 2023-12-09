import {
  TransformEmail,
  TransformString,
} from '../../../../shared/decorators/validate.decorator';

export class RegisterRequestDto {
  @TransformEmail({ description: 'new user email for registration' })
  email: string;

  @TransformString({ description: 'new user password for registration' })
  password: string;
}
