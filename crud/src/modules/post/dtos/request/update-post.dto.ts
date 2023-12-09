import { TransformString } from '../../../../shared/decorators/validate.decorator';

export class UpdatePostRequestDto {
  @TransformString({ nullable: true })
  title?: string;

  @TransformString({ nullable: true })
  text?: string;
}
