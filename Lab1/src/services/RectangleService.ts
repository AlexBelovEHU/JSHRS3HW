import { Rectangle } from '../entities/Rectangle.js';
import { Point } from '../entities/Point.js';
import { EPSILON } from '../constants/defaults.js';

export class RectangleService {
  public calculateArea(rectangle: Rectangle): number {
    const points = rectangle.getPoints();
    const side1 = this.calculateDistance(points[0], points[1]);
    const side2 = this.calculateDistance(points[1], points[2]);
    
    return side1 * side2;
  }

  public calculatePerimeter(rectangle: Rectangle): number {
    const points = rectangle.getPoints();
    
    let perimeter = 0;
    for (let i = 0; i < points.length; i++) {
      const nextIndex = (i + 1) % points.length;
      perimeter += this.calculateDistance(points[i], points[nextIndex]);
    }
    
    return perimeter;
  }

  public isValidRectangle(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    if (this.areThreePointsCollinear(points[0], points[1], points[2])) {
      return false;
    }
    if (this.areThreePointsCollinear(points[1], points[2], points[3])) {
      return false;
    }
    if (this.areThreePointsCollinear(points[2], points[3], points[0])) {
      return false;
    }
    if (this.areThreePointsCollinear(points[3], points[0], points[1])) {
      return false;
    }
    
    const side1 = this.calculateDistance(points[0], points[1]);
    const side2 = this.calculateDistance(points[1], points[2]);
    const side3 = this.calculateDistance(points[2], points[3]);
    const side4 = this.calculateDistance(points[3], points[0]);
    
    if (!this.areEqual(side1, side3) || !this.areEqual(side2, side4)) {
      return false;
    }
    
    const diagonal1 = this.calculateDistance(points[0], points[2]);
    const diagonal2 = this.calculateDistance(points[1], points[3]);
    
    return this.areEqual(diagonal1, diagonal2);
  }

  public isConvex(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    let sign = 0;
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      const p3 = points[(i + 2) % points.length];
      
      const crossProduct = this.crossProduct2D(
        p2.x - p1.x, p2.y - p1.y,
        p3.x - p2.x, p3.y - p2.y,
      );
      
      if (Math.abs(crossProduct) > EPSILON) {
        const currentSign = Math.sign(crossProduct);
        if (sign === 0) {
          sign = currentSign;
        } else {
          if (sign !== currentSign) {
            return false;
          }
        }
      }
    }
    
    return true;
  }

  public isSquare(rectangle: Rectangle): boolean {
    if (!this.isValidRectangle(rectangle)) {
      return false;
    }
    
    const points = rectangle.getPoints();
    const side1 = this.calculateDistance(points[0], points[1]);
    const side2 = this.calculateDistance(points[1], points[2]);
    
    return this.areEqual(side1, side2);
  }

  public isRhombus(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    const side1 = this.calculateDistance(points[0], points[1]);
    const side2 = this.calculateDistance(points[1], points[2]);
    const side3 = this.calculateDistance(points[2], points[3]);
    const side4 = this.calculateDistance(points[3], points[0]);
    
    return this.areEqual(side1, side2) &&
           this.areEqual(side2, side3) &&
           this.areEqual(side3, side4);
  }

  public isTrapezoid(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    const isParallel01_23 = this.areParallel(points[0], points[1], points[2], points[3]);
    const isParallel12_30 = this.areParallel(points[1], points[2], points[3], points[0]);
    
    return isParallel01_23 || isParallel12_30;
  }

  private calculateDistance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = p2.z - p1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  private areThreePointsCollinear(p1: Point, p2: Point, p3: Point): boolean {
    const area = Math.abs(
      p1.x * (p2.y - p3.y) +
      p2.x * (p3.y - p1.y) +
      p3.x * (p1.y - p2.y),
    );
    return area < EPSILON;
  }

  private areEqual(value1: number, value2: number): boolean {
    return Math.abs(value1 - value2) < EPSILON;
  }

  private crossProduct2D(x1: number, y1: number, x2: number, y2: number): number {
    return x1 * y2 - y1 * x2;
  }

  private areParallel(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
    const dx1 = p2.x - p1.x;
    const dy1 = p2.y - p1.y;
    const dx2 = p4.x - p3.x;
    const dy2 = p4.y - p3.y;
    
    const crossProduct = this.crossProduct2D(dx1, dy1, dx2, dy2);
    return Math.abs(crossProduct) < EPSILON;
  }
}
