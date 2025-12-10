import { Shape } from '../entities/Shape.js';
import { Rectangle } from '../entities/Rectangle.js';
import { Pyramid } from '../entities/Pyramid.js';
import { Point } from '../entities/Point.js';
import { CompositeSpecification } from './CompositeSpecification.js';
import { Warehouse } from '../warehouse/Warehouse.js';

export class ByIdSpecification<T extends Shape> extends CompositeSpecification<T> {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  public isSatisfiedBy(item: T): boolean {
    return item.id === this.id;
  }
}

export class ByNameSpecification<T extends Shape> extends CompositeSpecification<T> {
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public isSatisfiedBy(item: T): boolean {
    return item.name === this.name;
  }
}

export class ByFirstQuadrantSpecification<T extends Shape> extends CompositeSpecification<T> {
  public isSatisfiedBy(item: T): boolean {
    const points = this.getPoints(item);
    return points.every(point => point.x > 0 && point.y > 0);
  }

  private getPoints(shape: Shape): Point[] {
    if (shape instanceof Rectangle) {
      return shape.getPoints();
    } else if (shape instanceof Pyramid) {
      return [shape.apex, ...shape.getBasePoints()];
    }
    return [];
  }
}

export class BySurfaceAreaRangeSpecification<T extends Shape> extends CompositeSpecification<T> {
  private minArea: number;
  private maxArea: number;

  constructor(
    minArea: number,
    maxArea: number,
  ) {
    super();
    this.minArea = minArea;
    this.maxArea = maxArea;
  }

  public isSatisfiedBy(item: T): boolean {
    const warehouse = Warehouse.getInstance();
    const area = warehouse.getArea(item.id);
    return area !== undefined && area >= this.minArea && area <= this.maxArea;
  }
}

export class ByVolumeRangeSpecification<T extends Shape> extends CompositeSpecification<T> {
  private minVolume: number;
  private maxVolume: number;

  constructor(
    minVolume: number,
    maxVolume: number,
  ) {
    super();
    this.minVolume = minVolume;
    this.maxVolume = maxVolume;
  }

  public isSatisfiedBy(item: T): boolean {
    const warehouse = Warehouse.getInstance();
    const volume = warehouse.getVolume(item.id);
    return volume !== undefined && volume >= this.minVolume && volume <= this.maxVolume;
  }
}

export class ByPerimeterRangeSpecification<T extends Shape> extends CompositeSpecification<T> {
  private minPerimeter: number;
  private maxPerimeter: number;

  constructor(
    minPerimeter: number,
    maxPerimeter: number,
  ) {
    super();
    this.minPerimeter = minPerimeter;
    this.maxPerimeter = maxPerimeter;
  }

  public isSatisfiedBy(item: T): boolean {
    const warehouse = Warehouse.getInstance();
    const perimeter = warehouse.getPerimeter(item.id);
    return perimeter !== undefined && perimeter >= this.minPerimeter && perimeter <= this.maxPerimeter;
  }
}

export class ByDistanceFromOriginRangeSpecification<T extends Shape> extends CompositeSpecification<T> {
  private minDistance: number;
  private maxDistance: number;

  constructor(
    minDistance: number,
    maxDistance: number,
  ) {
    super();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }

  public isSatisfiedBy(item: T): boolean {
    const points = this.getPoints(item);
    return points.some(point => {
      const distance = Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
      return distance >= this.minDistance && distance <= this.maxDistance;
    });
  }

  private getPoints(shape: Shape): Point[] {
    if (shape instanceof Rectangle) {
      return shape.getPoints();
    } else if (shape instanceof Pyramid) {
      return [shape.apex, ...shape.getBasePoints()];
    }
    return [];
  }
}
