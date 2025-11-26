import { Pyramid } from '../entities/Pyramid.js';
import { EPSILON } from '../constants/defaults.js';
import { MathUtils } from '../utils/MathUtils.js';
import { GeometryCalculator } from '../utils/GeometryCalculator.js';

export class PyramidService {
  public calculateSurfaceArea(pyramid: Pyramid): number {
    const baseArea = GeometryCalculator.calculatePolygonArea(pyramid.getBasePoints());
    
    const basePoints = pyramid.getBasePoints();
    let trianglesArea = 0;
    
    for (let i = 0; i < basePoints.length; i++) {
      const nextIndex = (i + 1) % basePoints.length;
      const triangleArea = GeometryCalculator.calculateTriangleArea(
        pyramid.apex,
        basePoints[i],
        basePoints[nextIndex],
      );
      trianglesArea += triangleArea;
    }
    
    return baseArea + trianglesArea;
  }

  public calculateVolume(pyramid: Pyramid): number {
    const baseArea = GeometryCalculator.calculatePolygonArea(pyramid.getBasePoints());
    const height = this.calculateHeight(pyramid);
    
    return (1 / 3) * baseArea * height;
  }

  public calculateVolumeRatioAfterSlicing(pyramid: Pyramid, coordinatePlane: 'xy' | 'xz' | 'yz', sliceDistance: number): number {
    const totalVolume = this.calculateVolume(pyramid);
    
    if (Math.abs(totalVolume) < EPSILON) {
      return 0;
    }
    
    const basePoints = pyramid.getBasePoints();
    
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
    const basePoints = pyramid.getBasePoints();
    
    if (!GeometryCalculator.arePointsCoplanar(basePoints)) {
      return false;
    }
    
    if (GeometryCalculator.arePointsCoplanar([...basePoints, pyramid.apex])) {
      return false;
    }
    
    const baseArea = GeometryCalculator.calculatePolygonArea(basePoints);
    if (baseArea < EPSILON) {
      return false;
    }
    
    return true;
  }

  public baseLiesOnCoordinatePlane(pyramid: Pyramid): string | null {
    const basePoints = pyramid.getBasePoints();
    
    const allSameZ = basePoints.every((p) => MathUtils.areEqual(p.z, basePoints[0].z));
    if (allSameZ && MathUtils.areEqual(basePoints[0].z, 0)) {
      return 'xy';
    }
    const allSameY = basePoints.every((p) => MathUtils.areEqual(p.y, basePoints[0].y));
    if (allSameY && MathUtils.areEqual(basePoints[0].y, 0)) {
      return 'xz';
    }
    const allSameX = basePoints.every((p) => MathUtils.areEqual(p.x, basePoints[0].x));
    if (allSameX && MathUtils.areEqual(basePoints[0].x, 0)) {
      return 'yz';
    }
    
    return null;
  }

  private calculateHeight(pyramid: Pyramid): number {
    const basePoints = pyramid.getBasePoints();
    const normal = GeometryCalculator.calculateNormal(basePoints[0], basePoints[1], basePoints[2]);
    
    return GeometryCalculator.calculatePointToPlaneDistance(pyramid.apex, basePoints[0], normal);
  }
}
