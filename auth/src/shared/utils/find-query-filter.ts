import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { relationDelimiter } from '../constant/constants';
import { EntityNames } from '../enums/entity-names.enum';
import { SortType } from '../enums/entity-sort.enum';
import { FindQueryFilterJoinType } from '../types/find-query-filter-join.types';
import {
  camelToSnakeCase,
  getSkipAmount,
  snakeCaseToCamelCase,
} from './helpers';

export class FindFilterQuery<Entity extends ObjectLiteral> {
  query: SelectQueryBuilder<Entity>;

  constructor(query: SelectQueryBuilder<Entity>) {
    this.query = query;
  }

  select(fields: string[]): FindFilterQuery<Entity> {
    // select<T, V = [EntityNames, ...T[]]>(fields: V): FindFilterQuery<Entity> {
    this.query.select(fields as string[]);

    return this;
  }

  setSearch<E>(
    field: Partial<{ [T in keyof E]: string }> & { col: string },
  ): FindFilterQuery<Entity> {
    const key = Object.keys(field).find((c) => c !== 'col') as string;

    if (field[key] === undefined) {
      return this;
    }

    const paramKey = snakeCaseToCamelCase(`${field.col}_${key}`);

    this.query.andWhere(`LOWER(${field.col}.${key}) ILIKE :${paramKey}`, {
      [paramKey]: `%${field[key]}%`,
    });

    return this;
  }

  setWhere<E>(
    field: Partial<{ [T in keyof E]: any }> & { col: string },
  ): FindFilterQuery<Entity> {
    const key = Object.keys(field).find((c) => c !== 'col') as string;

    if (field[key] === undefined) {
      return this;
    }

    const paramKey = snakeCaseToCamelCase(`${field.col}_${key}`);

    this.query.andWhere(`${field.col}.${key} = :${paramKey}`, {
      [paramKey]: field[key],
    });

    return this;
  }

  setLessThan<E>(
    field: Partial<{ [T in keyof E]: any }> & { col: string },
  ): FindFilterQuery<Entity> {
    const key = Object.keys(field).find((c) => c !== 'col') as string;

    if (field[key] === undefined) {
      return this;
    }

    const paramKey = snakeCaseToCamelCase(`${field.col}_${key}`);

    this.query.andWhere(`${field.col}.${key} < :${paramKey}`, {
      [paramKey]: field[key],
    });

    return this;
  }

  setBiggerThan<E>(
    field: Partial<{ [T in keyof E]: any }> & { col: string },
  ): FindFilterQuery<Entity> {
    const key = Object.keys(field).find((c) => c !== 'col') as string;

    if (field[key] === undefined) {
      return this;
    }

    const paramKey = snakeCaseToCamelCase(`${field.col}_${key}`);

    this.query.andWhere(`${field.col}.${key} > :${paramKey}`, {
      [paramKey]: field[key],
    });

    return this;
  }

  setOr<E>(
    field: Partial<{ [T in keyof E]: any }> & { col: string },
  ): FindFilterQuery<Entity> {
    const key = Object.keys(field).find((c) => c !== 'col') as string;

    if (field[key] === undefined) {
      return this;
    }

    const paramKey = snakeCaseToCamelCase(`${field.col}_${key}`);

    this.query.orWhere(`${field.col}.${key} = :${paramKey}`, {
      [paramKey]: field[key],
    });

    return this;
  }

  setIn<E>(
    field: Partial<{ [T in keyof E]: any }> & { col: string },
  ): FindFilterQuery<Entity> {
    const key = Object.keys(field).find((c) => c !== 'col') as string;

    if (field[key] === undefined || !field[key].length) {
      return this;
    }

    const paramKey = snakeCaseToCamelCase(`${field.col}_${key}`);

    this.query.andWhere(
      `${field.col}${relationDelimiter}${key} IN (:...${paramKey})`,
      {
        [paramKey]: field[key],
      },
    );

    return this;
  }

  setRelations<E>(
    relation: FindQueryFilterJoinType<E>,
  ): FindFilterQuery<Entity> {
    const params: [string, string, string?, object?] = [
      relation.column,
      relation.asColumnName,
    ];

    if (relation.condition) {
      const key = Object.keys(relation.condition)[0];

      if (key !== undefined && relation.condition[key] !== undefined) {
        const paramKey = snakeCaseToCamelCase(
          `${relation.asColumnName}_${key}`,
        );

        const findCondition = Array.isArray(relation.condition[key])
          ? `${relation.asColumnName}.${camelToSnakeCase(
              key,
            )} IN (:...${paramKey})`
          : `${relation.asColumnName}.${camelToSnakeCase(key)} = :${paramKey}`;

        params.push(findCondition, { [paramKey]: relation.condition[key] });
      }
    }
    this.query.leftJoin(...params);

    return this;
  }

  getPagination(pagination: {
    page: number;
    limit: number;
  }): FindFilterQuery<Entity> {
    const skip = getSkipAmount({
      page: pagination.page,
      limit: pagination.limit,
    });

    this.query.take(pagination.limit).skip(skip);

    return this;
  }

  sort<T>(
    col: EntityNames,
    key: T,
    sortType: SortType,
  ): FindFilterQuery<Entity> {
    this.query.orderBy(`${col}${relationDelimiter}${key}`, sortType);

    return this;
  }

  addSort<T = string>(
    col: string,
    key: T,
    sortType: SortType,
  ): FindFilterQuery<Entity> {
    this.query.addOrderBy(`${col}${relationDelimiter}${key}`, sortType);

    return this;
  }

  async getOne(options?: { withDeleted: boolean }): Promise<Entity | null> {
    if (options?.withDeleted) {
      this.query.withDeleted();
    }

    return this.query.getOne();
  }

  async getManyAndCount(options?: {
    withDeleted: boolean;
  }): Promise<[Entity[], number]> {
    if (options?.withDeleted) {
      this.query.withDeleted();
    }

    return this.query.getManyAndCount();
  }
}
