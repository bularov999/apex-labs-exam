import { applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

export const ApiFileUpload = (
  key: string,
): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [key]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
