import { TransformString } from '../../../../shared/decorators/validate.decorator';

export class CreatePostRequestDto {
  @TransformString()
  title: string;

  @TransformString()
  text: string;
}
