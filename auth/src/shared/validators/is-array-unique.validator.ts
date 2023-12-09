import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { getDuplicates } from '../utils/helpers';

export const IsArrayUnique = (
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  const decorator: PropertyDecorator = (object, propertyName): void => {
    registerDecorator({
      name: IsArrayUnique.name,
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      validator: {
        validate(values: string[]) {
          const duplicate = getDuplicates(values);

          return !duplicate.length;
        },
        defaultMessage: (validationArguments: ValidationArguments) =>
          `Select values has duplicates: ${getDuplicates(
            validationArguments.value,
          )}`,
      },
    });
  };

  return decorator;
};
