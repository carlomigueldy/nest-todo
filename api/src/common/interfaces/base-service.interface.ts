export interface BaseServiceInterface<T> {
  findAll(): Promise<T[]>;

  findOne(id: string): Promise<T>;

  create(createModelDto: any): Promise<T>;

  update(id: string, updateModelDto: any): Promise<T>;

  delete(id: string): Promise<T>;

  deleteForever(id: string): Promise<T>;
}
