import { Rectangle } from '../entities/Rectangle.js';
import { EPSILON } from '../constants/defaults.js';
import { MathUtils } from '../utils/MathUtils.js';

export class RectangleService {
  public calculateArea(rectangle: Rectangle): number {
    const points = rectangle.getPoints();
    const side1 = MathUtils.calculateDistance(points[0], points[1]);
    const side2 = MathUtils.calculateDistance(points[1], points[2]);
    
    return side1 * side2;
  }

  public calculatePerimeter(rectangle: Rectangle): number {
    const points = rectangle.getPoints();
    
    let perimeter = 0;
    for (let i = 0; i < points.length; i++) {
      const nextIndex = (i + 1) % points.length;
      perimeter += MathUtils.calculateDistance(points[i], points[nextIndex]);
    }
    
    return perimeter;
  }

  public isValidRectangle(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    if (MathUtils.areThreePointsCollinear(points[0], points[1], points[2])) {
      return false;
    }
    if (MathUtils.areThreePointsCollinear(points[1], points[2], points[3])) {
      return false;
    }
    if (MathUtils.areThreePointsCollinear(points[2], points[3], points[0])) {
      return false;
    }
    if (MathUtils.areThreePointsCollinear(points[3], points[0], points[1])) {
      return false;
    }
    
    const side1 = MathUtils.calculateDistance(points[0], points[1]);
    const side2 = MathUtils.calculateDistance(points[1], points[2]);
    const side3 = MathUtils.calculateDistance(points[2], points[3]);
    const side4 = MathUtils.calculateDistance(points[3], points[0]);
    
    if (!MathUtils.areEqual(side1, side3) || !MathUtils.areEqual(side2, side4)) {
      return false;
    }
    
    const diagonal1 = MathUtils.calculateDistance(points[0], points[2]);
    const diagonal2 = MathUtils.calculateDistance(points[1], points[3]);
    
    return MathUtils.areEqual(diagonal1, diagonal2);
  }

  public isConvex(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    let sign = 0;
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      const p3 = points[(i + 2) % points.length];
      
      const crossProduct = MathUtils.crossProduct2D(
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
    const side1 = MathUtils.calculateDistance(points[0], points[1]);
    const side2 = MathUtils.calculateDistance(points[1], points[2]);
    
    return MathUtils.areEqual(side1, side2);
  }

  public isRhombus(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    const side1 = MathUtils.calculateDistance(points[0], points[1]);
    const side2 = MathUtils.calculateDistance(points[1], points[2]);
    const side3 = MathUtils.calculateDistance(points[2], points[3]);
    const side4 = MathUtils.calculateDistance(points[3], points[0]);
    
    return MathUtils.areEqual(side1, side2) &&
           MathUtils.areEqual(side2, side3) &&
           MathUtils.areEqual(side3, side4);
  }

  public isTrapezoid(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    
    const isParallel01_23 = MathUtils.areParallel(points[0], points[1], points[2], points[3]);
    const isParallel12_30 = MathUtils.areParallel(points[1], points[2], points[3], points[0]);
    
    return isParallel01_23 || isParallel12_30;
  }
}
