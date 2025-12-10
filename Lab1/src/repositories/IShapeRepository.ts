import { Shape } from '../entities/Shape.js';
import type { ISpecification } from '../specifications/ISpecification.js';

export interface IShapeRepository<T extends Shape> {
  add(shape: T): void;
  remove(id: string): boolean;
  removeAll(): void;
  findById(id: string): T | undefined;
  findAll(): T[];
  findBySpecification(spec: ISpecification<T>): T[];
  sort(comparator: (a: T, b: T) => number): T[];
  getCount(): number;
}
