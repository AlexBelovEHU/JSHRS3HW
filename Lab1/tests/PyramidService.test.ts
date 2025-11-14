import { PyramidService } from '../src/services/PyramidService';
import { Pyramid } from '../src/entities/Pyramid';
import { Point } from '../src/entities/Point';

describe('PyramidService', () => {
  let service: PyramidService;

  beforeEach(() => {
    service = new PyramidService();
  });

  describe('calculateVolume', () => {
    test('should calculate volume of a pyramid with square base', () => {
      const pyramid = new Pyramid(
        'P1', 'TestPyramid',
        new Point(2, 2, 4),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 4, 0),
        new Point(0, 4, 0),
      );
      
      const volume = service.calculateVolume(pyramid);
      
      expect(volume).toBeGreaterThan(0);
      expect(typeof volume).toBe('number');
      expect(Number.isFinite(volume)).toBe(true);
    });

    test('should calculate correct volume for unit pyramid', () => {
      const pyramid = new Pyramid(
        'P2', 'UnitPyramid',
        new Point(0.5, 0.5, 1),
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(1, 1, 0),
        new Point(0, 1, 0),
      );
      
      const volume = service.calculateVolume(pyramid);
      
      expect(volume).toBeCloseTo(1/3, 5);
      expect(volume).toBeGreaterThan(0);
    });
  });

  describe('calculateSurfaceArea', () => {
    test('should calculate surface area of a pyramid', () => {
      const pyramid = new Pyramid(
        'P1', 'TestPyramid',
        new Point(2, 2, 4),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 4, 0),
        new Point(0, 4, 0),
      );
      
      const surfaceArea = service.calculateSurfaceArea(pyramid);
      
      expect(surfaceArea).toBeGreaterThan(0);
      expect(typeof surfaceArea).toBe('number');
      expect(Number.isFinite(surfaceArea)).toBe(true);
    });

    test('should include base area in surface area', () => {
      const pyramid = new Pyramid(
        'P2', 'BasePyramid',
        new Point(0.5, 0.5, 1),
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(1, 1, 0),
        new Point(0, 1, 0),
      );
      
      const surfaceArea = service.calculateSurfaceArea(pyramid);
      
      expect(surfaceArea).toBeGreaterThan(1);
    });
  });

  describe('isValidPyramid', () => {
    test('should validate a proper pyramid', () => {
      const pyramid = new Pyramid(
        'P1', 'ValidPyramid',
        new Point(2, 2, 4),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 4, 0),
        new Point(0, 4, 0),
      );
      
      const isValid = service.isValidPyramid(pyramid);
      
      expect(isValid).toBe(true);
    });

    test('should reject pyramid with apex on base plane', () => {
      const invalidPyramid = new Pyramid(
        'P2', 'InvalidPyramid',
        new Point(2, 2, 0),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 4, 0),
        new Point(0, 4, 0),
      );
      
      const isValid = service.isValidPyramid(invalidPyramid);
      
      expect(isValid).toBe(false);
    });
  });

  describe('baseLiesOnCoordinatePlane', () => {
    test('should detect base on xy-plane', () => {
      const pyramid = new Pyramid(
        'P1', 'XYPyramid',
        new Point(2, 2, 4),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 4, 0),
        new Point(0, 4, 0),
      );
      
      const plane = service.baseLiesOnCoordinatePlane(pyramid);
      
      expect(plane).toBe('xy');
      expect(plane).not.toBeNull();
    });

    test('should detect base on xz-plane', () => {
      const pyramid = new Pyramid(
        'P2', 'XZPyramid',
        new Point(2, 4, 2),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 0, 4),
        new Point(0, 0, 4),
      );
      
      const plane = service.baseLiesOnCoordinatePlane(pyramid);
      
      expect(plane).toBe('xz');
    });

    test('should return null when base is not on coordinate plane', () => {
      const pyramid = new Pyramid(
        'P3', 'OffPlanePyramid',
        new Point(2, 2, 4),
        new Point(0, 0, 1),
        new Point(4, 0, 1),
        new Point(4, 4, 1),
        new Point(0, 4, 1),
      );
      
      const plane = service.baseLiesOnCoordinatePlane(pyramid);
      
      expect(plane).toBeNull();
    });
  });

  describe('calculateVolumeRatioAfterSlicing', () => {
    test('should calculate volume ratio after slicing', () => {
      const pyramid = new Pyramid(
        'P1', 'SlicedPyramid',
        new Point(2, 2, 4),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 4, 0),
        new Point(0, 4, 0),
      );
      
      const ratio = service.calculateVolumeRatioAfterSlicing(pyramid, 'xy', 2);
      
      expect(ratio).toBeGreaterThanOrEqual(0);
      expect(ratio).toBeLessThanOrEqual(1);
      expect(typeof ratio).toBe('number');
    });

    test('should return 0 for slice outside pyramid bounds', () => {
      const pyramid = new Pyramid(
        'P2', 'BoundPyramid',
        new Point(2, 2, 4),
        new Point(0, 0, 0),
        new Point(4, 0, 0),
        new Point(4, 4, 0),
        new Point(0, 4, 0),
      );
      
      const ratio = service.calculateVolumeRatioAfterSlicing(pyramid, 'xy', 10);
      
      expect(ratio).toBe(0);
    });
  });
});
