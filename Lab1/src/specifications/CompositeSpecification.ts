import { Shape } from '../entities/Shape.js';
import type { ISpecification } from './ISpecification.js';

export abstract class CompositeSpecification<T extends Shape> implements ISpecification<T> {
  public abstract isSatisfiedBy(item: T): boolean;

  public and(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification(this, other);
  }

  public or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification(this, other);
  }

  public not(): ISpecification<T> {
    return new NotSpecification(this);
  }
}

export class AndSpecification<T extends Shape> extends CompositeSpecification<T> {
  private left: ISpecification<T>;
  private right: ISpecification<T>;

  constructor(
    left: ISpecification<T>,
    right: ISpecification<T>,
  ) {
    super();
    this.left = left;
    this.right = right;
  }

  public isSatisfiedBy(item: T): boolean {
    return this.left.isSatisfiedBy(item) && this.right.isSatisfiedBy(item);
  }
}

export class OrSpecification<T extends Shape> extends CompositeSpecification<T> {
  private left: ISpecification<T>;
  private right: ISpecification<T>;

  constructor(
    left: ISpecification<T>,
    right: ISpecification<T>,
  ) {
    super();
    this.left = left;
    this.right = right;
  }

  public isSatisfiedBy(item: T): boolean {
    return this.left.isSatisfiedBy(item) || this.right.isSatisfiedBy(item);
  }
}

export class NotSpecification<T extends Shape> extends CompositeSpecification<T> {
  private spec: ISpecification<T>;

  constructor(spec: ISpecification<T>) {
    super();
    this.spec = spec;
  }

  public isSatisfiedBy(item: T): boolean {
    return !this.spec.isSatisfiedBy(item);
  }
}
