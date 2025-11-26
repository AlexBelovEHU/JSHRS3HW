import { Point } from '../entities/Point.js';
import { EPSILON } from '../constants/defaults.js';

export class MathUtils {
  public static areEqual(value1: number, value2: number): boolean {
    return Math.abs(value1 - value2) < EPSILON;
  }

  public static calculateDistance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = p2.z - p1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  public static crossProduct2D(x1: number, y1: number, x2: number, y2: number): number {
    return x1 * y2 - y1 * x2;
  }

  public static areThreePointsCollinear(p1: Point, p2: Point, p3: Point): boolean {
    const area = Math.abs(
      p1.x * (p2.y - p3.y) +
      p2.x * (p3.y - p1.y) +
      p3.x * (p1.y - p2.y),
    );
    return area < EPSILON;
  }

  public static areParallel(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    const dx1 = p2.x - p1.x;
    const dy1 = p2.y - p1.y;
    const dx2 = p4.x - p3.x;
    const dy2 = p4.y - p3.y;
    
    const crossProduct = this.crossProduct2D(dx1, dy1, dx2, dy2);
    return Math.abs(crossProduct) < EPSILON;
  }
}
