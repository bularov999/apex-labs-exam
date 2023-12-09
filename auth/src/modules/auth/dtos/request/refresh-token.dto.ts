import { TransformString } from '../../../../shared/decorators/validate.decorator';

export class RefreshTokenRequestDto {
  @TransformString()
  refresh_token: string;
}
