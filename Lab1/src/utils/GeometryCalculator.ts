import { Point } from '../entities/Point.js';
import { EPSILON } from '../constants/defaults.js';

export class GeometryCalculator {
  public static calculateNormal(p1: Point, p2: Point, p3: Point): Point {
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v1z = p2.z - p1.z;
    
    const v2x = p3.x - p1.x;
    const v2y = p3.y - p1.y;
    const v2z = p3.z - p1.z;
    
    const normalX = v1y * v2z - v1z * v2y;
    const normalY = v1z * v2x - v1x * v2z;
    const normalZ = v1x * v2y - v1y * v2x;
    
    return new Point(normalX, normalY, normalZ);
  }

  public static calculateTriangleArea(p1: Point, p2: Point, p3: Point): number {
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v1z = p2.z - p1.z;
    
    const v2x = p3.x - p1.x;
    const v2y = p3.y - p1.y;
    const v2z = p3.z - p1.z;
    
    const crossX = v1y * v2z - v1z * v2y;
    const crossY = v1z * v2x - v1x * v2z;
    const crossZ = v1x * v2y - v1y * v2x;
    
    const magnitude = Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ);
    
    return magnitude / 2;
  }

  public static arePointsCoplanar(points: Point[]): boolean {
    if (points.length < 4) {
      return true;
    }
    
    const normal = this.calculateNormal(points[0], points[1], points[2]);
    const d = -(normal.x * points[0].x + normal.y * points[0].y + normal.z * points[0].z);
    
    for (let i = 3; i < points.length; i++) {
      const distance = Math.abs(
        normal.x * points[i].x +
        normal.y * points[i].y +
        normal.z * points[i].z +
        d,
      );
      
      if (distance > EPSILON) {
        return false;
      }
    }
    
    return true;
  }

  public static calculatePolygonArea(points: Point[]): number {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    
    return Math.abs(area) / 2;
  }

  public static calculatePointToPlaneDistance(point: Point, planePoint: Point, normal: Point): number {
    const d = -(normal.x * planePoint.x + normal.y * planePoint.y + normal.z * planePoint.z);
    
    const numerator = Math.abs(
      normal.x * point.x +
      normal.y * point.y +
      normal.z * point.z +
      d,
    );
    const denominator = Math.sqrt(
      normal.x * normal.x +
      normal.y * normal.y +
      normal.z * normal.z,
    );
    
    return numerator / denominator;
  }
}
