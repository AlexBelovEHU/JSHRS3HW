import { Point } from '../src/entities/Point';

describe('Point', () => {
  describe('constructor', () => {
    test('should create a 2D point with z=0 by default', () => {
      const point = new Point(1.5, 2.5);
      
      expect(point.x).toBe(1.5);
      expect(point.y).toBe(2.5);
      expect(point.z).toBe(0);
      expect(point).toBeInstanceOf(Point);
    });

    test('should create a 3D point with provided z coordinate', () => {
      const point = new Point(1.0, 2.0, 3.0);
      
      expect(point.x).toBe(1.0);
      expect(point.y).toBe(2.0);
      expect(point.z).toBe(3.0);
    });

    test('should handle negative coordinates', () => {
      const point = new Point(-1.5, -2.5, -3.5);
      
      expect(point.x).toBe(-1.5);
      expect(point.y).toBe(-2.5);
      expect(point.z).toBe(-3.5);
    });
  });

  describe('toString', () => {
    test('should return formatted string representation', () => {
      const point = new Point(1.5, 2.5, 3.5);
      
      const result = point.toString();
      
      expect(result).toBe('Point(1.5, 2.5, 3.5)');
      expect(typeof result).toBe('string');
      expect(result).toContain('Point');
    });
  });
});
