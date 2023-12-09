import { ValidationOptions, registerDecorator } from 'class-validator';

export const IsSelectExists = (
  keys: string[],
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  const decorator: PropertyDecorator = (object, propertyName): void => {
    registerDecorator({
      name: IsSelectExists.name,
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      validator: {
        validate(value: string[]) {
          const noneExistentValues = value.filter(
            (v) => !keys.includes(v.toString()),
          );

          return !noneExistentValues.length;
        },
        defaultMessage: () =>
          `your selected entities does not exist in ${keys.toString()}`,
      },
    });
  };
  return decorator;
};
