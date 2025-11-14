import { Pyramid } from '../entities/Pyramid.js';
import { Point } from '../entities/Point.js';
import { EPSILON } from '../constants/defaults.js';

export class PyramidService {
  public calculateSurfaceArea(pyramid: Pyramid): number {
    const baseArea = this.calculateBaseArea(pyramid);
    
    // Calculate areas of 4 triangular faces
    const basePoints = pyramid.getBasePoints();
    let trianglesArea = 0;
    
    for (let i = 0; i < basePoints.length; i++) {
      const nextIndex = (i + 1) % basePoints.length;
      const triangleArea = this.calculateTriangleArea(
        pyramid.apex,
        basePoints[i],
        basePoints[nextIndex],
      );
      trianglesArea += triangleArea;
    }
    
    return baseArea + trianglesArea;
  }

  public calculateVolume(pyramid: Pyramid): number {
    const baseArea = this.calculateBaseArea(pyramid);
    const height = this.calculateHeight(pyramid);
    
    return (1 / 3) * baseArea * height;
  }

  public calculateVolumeRatioAfterSlicing(pyramid: Pyramid, coordinatePlane: 'xy' | 'xz' | 'yz', sliceDistance: number): number {
    const totalVolume = this.calculateVolume(pyramid);
    
    if (Math.abs(totalVolume) < EPSILON) {
      return 0;
    }
    
    const basePoints = pyramid.getBasePoints();
    
    // Determine which part is sliced based on coordinate plane
    let effectiveHeight = 0;
    
    if (coordinatePlane === 'xy') {
      const baseZ = basePoints[0].z;
      const apexZ = pyramid.apex.z;
      effectiveHeight = Math.abs(apexZ - baseZ);
      
      if (sliceDistance > Math.min(baseZ, apexZ) && sliceDistance < Math.max(baseZ, apexZ)) {
        const remainingHeight = Math.abs(sliceDistance - baseZ);
        const ratio = remainingHeight / effectiveHeight;
        const slicedVolume = (ratio * ratio * ratio) * totalVolume;
        return slicedVolume / totalVolume;
      }
    } else if (coordinatePlane === 'xz') {
      const baseY = basePoints[0].y;
      const apexY = pyramid.apex.y;
      effectiveHeight = Math.abs(apexY - baseY);
      
      if (sliceDistance > Math.min(baseY, apexY) && sliceDistance < Math.max(baseY, apexY)) {
        const remainingHeight = Math.abs(sliceDistance - baseY);
        const ratio = remainingHeight / effectiveHeight;
        const slicedVolume = (ratio * ratio * ratio) * totalVolume;
        return slicedVolume / totalVolume;
      }
    } else if (coordinatePlane === 'yz') {
      const baseX = basePoints[0].x;
      const apexX = pyramid.apex.x;
      effectiveHeight = Math.abs(apexX - baseX);
      
      if (sliceDistance > Math.min(baseX, apexX) && sliceDistance < Math.max(baseX, apexX)) {
        const remainingHeight = Math.abs(sliceDistance - baseX);
        const ratio = remainingHeight / effectiveHeight;
        const slicedVolume = (ratio * ratio * ratio) * totalVolume;
        return slicedVolume / totalVolume;
      }
    }
    
    return 0;
  }

  public isValidPyramid(pyramid: Pyramid): boolean {
    // Check if base points form a valid quadrilateral
    const basePoints = pyramid.getBasePoints();
    
    // Check if all base points are coplanar
    if (!this.arePointsCoplanar(basePoints)) {
      return false;
    }
    
    // Check if apex is not on the base plane
    if (this.arePointsCoplanar([...basePoints, pyramid.apex])) {
      return false;
    }
    
    // Check if base has non-zero area
    const baseArea = this.calculateBaseArea(pyramid);
    if (baseArea < EPSILON) {
      return false;
    }
    
    return true;
  }

  public baseLiesOnCoordinatePlane(pyramid: Pyramid): string | null {
    const basePoints = pyramid.getBasePoints();
    
    // Check if all z-coordinates are the same (lies on xy-plane)
    const allSameZ = basePoints.every((p) => this.areEqual(p.z, basePoints[0].z));
    if (allSameZ && this.areEqual(basePoints[0].z, 0)) {
      return 'xy';
    }
    
    // Check if all y-coordinates are the same (lies on xz-plane)
    const allSameY = basePoints.every((p) => this.areEqual(p.y, basePoints[0].y));
    if (allSameY && this.areEqual(basePoints[0].y, 0)) {
      return 'xz';
    }
    
    // Check if all x-coordinates are the same (lies on yz-plane)
    const allSameX = basePoints.every((p) => this.areEqual(p.x, basePoints[0].x));
    if (allSameX && this.areEqual(basePoints[0].x, 0)) {
      return 'yz';
    }
    
    return null;
  }

  private calculateBaseArea(pyramid: Pyramid): number {
    const basePoints = pyramid.getBasePoints();
    
    // Using Shoelace formula for quadrilateral
    // Assume points are in order
    let area = 0;
    for (let i = 0; i < basePoints.length; i++) {
      const j = (i + 1) % basePoints.length;
      area += basePoints[i].x * basePoints[j].y;
      area -= basePoints[j].x * basePoints[i].y;
    }
    
    return Math.abs(area) / 2;
  }

  private calculateHeight(pyramid: Pyramid): number {
    const basePoints = pyramid.getBasePoints();
    
    // Calculate distance from apex to base plane
    // First, find the plane equation of the base
    const normal = this.calculateNormal(basePoints[0], basePoints[1], basePoints[2]);
    const d = -(normal.x * basePoints[0].x + normal.y * basePoints[0].y + normal.z * basePoints[0].z);
    
    // Distance from apex to plane
    const numerator = Math.abs(
      normal.x * pyramid.apex.x +
      normal.y * pyramid.apex.y +
      normal.z * pyramid.apex.z +
      d,
    );
    const denominator = Math.sqrt(
      normal.x * normal.x +
      normal.y * normal.y +
      normal.z * normal.z,
    );
    
    return numerator / denominator;
  }

  private calculateTriangleArea(p1: Point, p2: Point, p3: Point): number {
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

  private calculateNormal(p1: Point, p2: Point, p3: Point): Point {
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

  private arePointsCoplanar(points: Point[]): boolean {
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

  private areEqual(value1: number, value2: number): boolean {
    return Math.abs(value1 - value2) < EPSILON;
  }
}
