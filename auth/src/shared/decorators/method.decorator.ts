/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const PostDecorator =
  (path: string, description: string, getResponse?: () => any) =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    ApiOperation({ description })(target, propertyKey, descriptor);
    ApiResponse({ type: getResponse ? getResponse() : undefined })(
      target,
      propertyKey,
      descriptor,
    );
    Post(path)(target, propertyKey, descriptor);

    return target[propertyKey as keyof typeof target];
  };

export const GetDecorator =
  (path: string, description: string, getResponse?: () => any) =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    ApiOperation({ description })(target, propertyKey, descriptor);
    ApiResponse({ type: getResponse ? getResponse() : undefined })(
      target,
      propertyKey,
      descriptor,
    );
    Get(path)(target, propertyKey, descriptor);

    return target[propertyKey as keyof typeof target];
  };

export const DeleteDecorator =
  (path: string, description: string, getResponse?: () => any) =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    ApiOperation({ description })(target, propertyKey, descriptor);
    ApiResponse({ type: getResponse ? getResponse() : undefined })(
      target,
      propertyKey,
      descriptor,
    );
    Delete(path)(target, propertyKey, descriptor);

    return target[propertyKey as keyof typeof target];
  };

export const PatchDecorator =
  (path: string, description: string, getResponse?: () => any) =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    ApiOperation({ description })(target, propertyKey, descriptor);
    ApiResponse({ type: getResponse ? getResponse() : undefined })(
      target,
      propertyKey,
      descriptor,
    );
    Patch(path)(target, propertyKey, descriptor);

    return target[propertyKey as keyof typeof target];
  };

export const PutDecorator =
  (path: string, description: string, getResponse?: () => any) =>
  (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    ApiOperation({ description })(target, propertyKey, descriptor);
    ApiResponse({ type: getResponse ? getResponse() : undefined })(
      target,
      propertyKey,
      descriptor,
    );
    Put(path)(target, propertyKey, descriptor);

    return target[propertyKey as keyof typeof target];
  };
