export interface BaseServiceInterface<T> {
  findAll(): Promise<T[]>

  findOne(id: string): Promise<T>

  create(createDto: any): Promise<T>

  update(id: string, updateDto: any): Promise<T>

  delete(id: string): Promise<T>

  deleteForever(id: string): Promise<T>
}