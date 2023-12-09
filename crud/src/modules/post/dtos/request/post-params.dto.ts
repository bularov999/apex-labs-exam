import { TransformID } from '../../../../shared/decorators/validate.decorator';

export class PostParamsDto {
  @TransformID()
  id: number;
}
