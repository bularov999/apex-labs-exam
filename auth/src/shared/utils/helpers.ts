import * as _ from 'lodash';
import { oneDay, relationDelimiter } from '../constant/constants';
import {
  FindQueryFilterJoinType,
  RelationJoinTypes,
} from '../types/find-query-filter-join.types';

export const joinRelationNames = (
  parent: string,
  child: string,
): RelationJoinTypes => {
  const column = (parent + relationDelimiter + child).replace(/[0-9]+/g, '');

  const asColumnName = `${parent}_${child}_e`;

  return {
    column,
    asColumnName,
  };
};

export const joinRelations = <T = object>(
  selector: T,
): FindQueryFilterJoinType[] => {
  const findFilterQueryJoinType: FindQueryFilterJoinType[] = [];
  const keys = Object.keys(selector as object);

  for (const key of keys) {
    findFilterQueryJoinType.push(selector[key]);
  }

  return findFilterQueryJoinType;
};

export const joinEntities = (...string): string =>
  string.join(relationDelimiter);

export const snakeCaseToCamelCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );

export const camelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const getSkipAmount = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): number => (page === 1 ? 0 : (page - 1) * limit);

export const getMinNumber = <T>(entity: T[], key: keyof T): number =>
  _.min(entity.map((e) => e[key]));

export const getDuplicates = <T>(items: T[]): T[] =>
  items.filter((item, index) => items.indexOf(item) !== index);

export const randomIntFromInterval = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getDateDifference = (dates: {
  startDate: Date;
  endDate: Date;
}): { isBiggerThanOneDay: boolean; isLessThanOneMonth: boolean } => {
  const dateDifference = dates.endDate.getTime() - dates.startDate.getTime();

  return {
    isBiggerThanOneDay: dateDifference >= oneDay,
    isLessThanOneMonth: dateDifference <= oneDay * 30,
  };
};

export const getDateWithoutTZandTime = (date: Date): string => {
  // Set the time portion to 0:00:00
  date.setHours(0, 0, 0, 0);
  // Get the date string without time and timezone
  const dateString = date.toISOString().split('T')[0];
  return dateString;
};

export const flat = <E>(key: keyof E, element: E): E[] => {
  const result: E[] = [];
  result.push(element);

  const flatFunc = (k: any, e: E): void => {
    const children: Array<E> = e[k];

    if (children && children.length) {
      for (const child of children) {
        if (child[k] && child[k].length) {
          flatFunc(k, child);
        }
        result.push(child);
      }
    }
  };

  flatFunc(key, element);

  return result;
};

export const entitySelector = (
  entityName: string,
  arr: string[],
  relationFields: { [key: string]: RelationJoinTypes },
): string[] => {
  const entitySelects: string[] = [];

  for (const e of arr) {
    const r = relationFields[e];

    if (r) {
      entitySelects.push(r.asColumnName);
    }
  }

  entitySelects.unshift(entityName);

  return entitySelects;
};

export const generateSelectorObjects = <T = object>(fields: string[][]): T => {
  const obj = {};

  for (const f of fields) {
    obj[f[1]] = joinRelationNames(f[0], f[1]);
  }

  return obj as T;
};

export const generateEntitySelector = <E = string, T = object>(
  entityName: E,
  selectors: T,
): any => {
  const result = {};

  const findFilterQueryResolver = (
    fieldName: E,
    selector: T,
    res: any,
  ): any => {
    // eslint-disable-next-line guard-for-in
    for (const key in selector) {
      const relationsNames = joinRelationNames(fieldName as string, key);
      result[key as string] = relationsNames;

      if (selector[key]) {
        findFilterQueryResolver(
          relationsNames.asColumnName as E,
          selector[key] as T,
          res,
        );
      }
    }
  };

  findFilterQueryResolver(entityName, selectors, result);

  return result;
};

export const isVariableDefined = (variable: null | unknown): boolean =>
  variable !== undefined;
