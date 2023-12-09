import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  isNumber,
  isString,
} from 'class-validator';
import {
  StringToDateTransformer,
  StringToNumberTransformer,
  StringToPhoneTransformer,
  StringToRegexTransformer,
} from '../utils/validation-converters';

interface IDecoratorArgument {
  nullable?: boolean;
  description?: string;
}

export const TransformDate =
  ({
    nullable,
    description = 'Date parameter',
  }: IDecoratorArgument = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToDateTransformer)(target, propertyKey);
    IsDate()(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: String, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: String, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformInt =
  ({
    nullable,
    description = 'integer parameter',
  }: IDecoratorArgument = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToNumberTransformer)(target, propertyKey);
    IsNumber()(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: Number, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: Number, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformFloat =
  ({
    nullable,
    description = 'float parameter',
  }: IDecoratorArgument = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToNumberTransformer)(target, propertyKey);
    IsNumber()(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: Number, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: Number, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformString =
  ({
    nullable,
    description = 'string parameter',
  }: IDecoratorArgument = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    IsString()(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: String, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: String, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformEmail =
  ({
    nullable,
    description = 'email parameter',
  }: IDecoratorArgument = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    IsEmail()(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: String, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: String, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformID =
  ({ nullable }: { nullable?: boolean }): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToNumberTransformer)(target, propertyKey);
    Transform(StringToNumberTransformer)(target, propertyKey);
    IsInt()(target, propertyKey);

    if (!nullable) {
      ApiProperty()(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional()(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformRegEx =
  ({
    nullable,
    description = 'regex parameter',
  }: IDecoratorArgument = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToRegexTransformer)(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: RegExp, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: RegExp, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

// for query boolean parameters should be like bool= -> means false, bool-> x should be true
export const TransformBoolean =
  (
    { nullable, description = 'boolean parameter' }: IDecoratorArgument = {},
    inQuery = false,
  ): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    if (!inQuery) {
      IsBoolean()(target, propertyKey);
    } else {
      IsBooleanString()(target, propertyKey);
    }
    IsBoolean()(target, propertyKey);
    Type(() => Boolean)(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: Boolean, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: Boolean, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformEnum =
  (
    v: object,
    { nullable, description = 'enum parameter' }: IDecoratorArgument = {},
  ): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    IsEnum(v)(target, propertyKey);

    if (!nullable) {
      ApiProperty({ enum: v, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ enum: v, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformArray =
  // eslint-disable-next-line @typescript-eslint/naming-convention


    <A = string, R = string>(
      Convert: new (v: A) => R,
      { nullable, description = 'array parameter' }: IDecoratorArgument = {},
    ): PropertyDecorator =>
    (target: object, propertyKey: string | symbol) => {
      // Transform((params) => params.value?.map((el: A) => new Convert(el))); // TODO: fix

      IsArray()(target, propertyKey);

      if (Convert.name === 'Number') {
        IsInt({ each: true })(target, propertyKey);
      }
      if (Convert.name === 'String') {
        IsString({ each: true })(target, propertyKey);
      }

      Type(() => Convert)(target, propertyKey);

      if (!nullable) {
        ApiProperty({ type: [Convert], description })(target, propertyKey);
        IsNotEmpty()(target, propertyKey);
      } else {
        ApiPropertyOptional({ type: [Convert], description })(
          target,
          propertyKey,
        );
        IsOptional()(target, propertyKey);
      }

      return target[propertyKey as keyof typeof target];
    };

export const TransformObject =
  <TA = string, TR = string>(
    Convert: new (v: TA) => TR,
    { nullable, description = 'object parameter' }: IDecoratorArgument = {},
  ): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform((params) => new Convert(params.value));
    IsObject({})(target, propertyKey);
    Type(() => Convert)(target, propertyKey);
    ValidateNested({ each: true })(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: Convert, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: Convert, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformPhone =
  ({
    nullable,
    description = 'phone parameter',
  }: IDecoratorArgument = {}): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform(StringToPhoneTransformer)(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: String, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: String, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };

export const TransformQueryArray =
  <A = string, R = string>(
    Convert: new (v: A) => R,
    {
      nullable,
      description = 'query array parameter',
    }: IDecoratorArgument = {},
  ): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    Transform((params) => {
      const result = !Array.isArray(params.value)
        ? params.value.replace(/\s/g, '').split(',')
        : params.value;

      if (Convert.name === 'Number') {
        for (const v of result) {
          if (!isNumber(+v)) {
            return undefined;
          }
        }
      } else if (Convert.name === 'String') {
        for (const v of result) {
          if (!isString(String(v))) {
            return undefined;
          }
        }
      } else {
        return undefined;
      }

      return result;
    })(target, propertyKey);

    if (!nullable) {
      ApiProperty({ type: String, description })(target, propertyKey);
      IsNotEmpty()(target, propertyKey);
    } else {
      ApiPropertyOptional({ type: String, description })(target, propertyKey);
      IsOptional()(target, propertyKey);
    }

    return target[propertyKey as keyof typeof target];
  };
