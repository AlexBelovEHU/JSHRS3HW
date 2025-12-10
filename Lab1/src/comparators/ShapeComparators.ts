import { Shape } from '../entities/Shape.js';
import { Rectangle } from '../entities/Rectangle.js';
import { Pyramid } from '../entities/Pyramid.js';

export interface IComparator<T> {
  compare(a: T, b: T): number;
}

export class IdComparator<T extends Shape> implements IComparator<T> {
  public compare(a: T, b: T): number {
    return a.id.localeCompare(b.id);
  }
}

export class NameComparator<T extends Shape> implements IComparator<T> {
  public compare(a: T, b: T): number {
    return a.name.localeCompare(b.name);
  }
}

export class FirstPointXComparator<T extends Shape> implements IComparator<T> {
  public compare(a: T, b: T): number {
    const xA = this.getFirstPointX(a);
    const xB = this.getFirstPointX(b);
    return xA - xB;
  }

  private getFirstPointX(shape: Shape): number {
    if (shape instanceof Rectangle) {
      return shape.point1.x;
    } else if (shape instanceof Pyramid) {
      return shape.apex.x;
    }
    return 0;
  }
}

export class FirstPointYComparator<T extends Shape> implements IComparator<T> {
  public compare(a: T, b: T): number {
    const yA = this.getFirstPointY(a);
    const yB = this.getFirstPointY(b);
    return yA - yB;
  }

  private getFirstPointY(shape: Shape): number {
    if (shape instanceof Rectangle) {
      return shape.point1.y;
    } else if (shape instanceof Pyramid) {
      return shape.apex.y;
    }
    return 0;
  }
}

export class FirstPointZComparator<T extends Shape> implements IComparator<T> {
  public compare(a: T, b: T): number {
    const zA = this.getFirstPointZ(a);
    const zB = this.getFirstPointZ(b);
    return zA - zB;
  }

  private getFirstPointZ(shape: Shape): number {
    if (shape instanceof Rectangle) {
      return shape.point1.z;
    } else if (shape instanceof Pyramid) {
      return shape.apex.z;
    }
    return 0;
  }
}
