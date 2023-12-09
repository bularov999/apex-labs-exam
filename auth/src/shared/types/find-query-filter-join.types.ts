export interface FindQueryFilterJoinType<Entity = unknown>
  extends RelationJoinTypes {
  condition?: { [T in keyof Entity]: any };
}

export interface RelationJoinTypes {
  column: string;
  asColumnName: string;
}
