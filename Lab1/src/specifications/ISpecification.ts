import { Shape } from '../entities/Shape.js';

export interface ISpecification<T extends Shape> {
  isSatisfiedBy(item: T): boolean;
  and(other: ISpecification<T>): ISpecification<T>;
  or(other: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}
