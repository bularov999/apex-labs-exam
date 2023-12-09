import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<Entity extends ObjectLiteral> {
  protected readonly repository: Repository<Entity>;

  async save(data: DeepPartial<Entity>[]): Promise<Entity[]> {
    return this.repository.save(data);
  }

  async delete(data: number[]): Promise<void> {
    await this.repository.softDelete(data);
  }

  async create(data: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.repository.create(data);

    return this.repository.save(entity) as unknown as Entity;
  }

  async findOne(criteria: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.repository.findOne(criteria);
  }

  async find(criteria?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(criteria);
  }

  async partialUpdate(
    criterai: FindOptionsWhere<Entity>,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<void> {
    await this.repository.update(criterai, data);
  }

  async update(
    criteria: FindOptionsWhere<Entity>,
    data: Partial<Entity>,
  ): Promise<Entity> {
    const instance = (await this.repository.findOne({
      where: criteria,
    })) as Entity;

    return this.repository.save({ ...instance, ...data });
  }

  async remove(criteria: Entity[]): Promise<Entity | Entity[]> {
    return this.repository.remove(criteria);
  }
}
