import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const IsSortKeyExists = <T>(
  keys: T[],
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  const decorator: PropertyDecorator = (object, propertyName): void => {
    registerDecorator({
      name: IsSortKeyExists.name,
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      validator: {
        validate(value) {
          return keys.includes(value);
        },

        defaultMessage: (validationArguments: ValidationArguments) =>
          `Sort key: ${validationArguments.value} does not exists`,
      },
    });
  };

  return decorator;
};
