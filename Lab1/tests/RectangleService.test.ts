import { RectangleService } from '../src/services/RectangleService';
import { Rectangle } from '../src/entities/Rectangle';
import { Point } from '../src/entities/Point';

describe('RectangleService', () => {
  let service: RectangleService;

  beforeEach(() => {
    service = new RectangleService();
  });

  describe('calculateArea', () => {
    test('should calculate area of a valid rectangle', () => {
      const rect = new Rectangle(
        'R1', 'TestRect',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      
      const area = service.calculateArea(rect);
      
      expect(area).toBeCloseTo(12, 5);
      expect(area).toBeGreaterThan(0);
      expect(typeof area).toBe('number');
    });

    test('should calculate area of a square', () => {
      const square = new Rectangle(
        'R2', 'Square',
        new Point(0, 0),
        new Point(5, 0),
        new Point(5, 5),
        new Point(0, 5),
      );
      
      const area = service.calculateArea(square);
      
      expect(area).toBeCloseTo(25, 5);
      expect(area).toBeGreaterThan(0);
    });

    test('should handle rectangles with decimal coordinates', () => {
      const rect = new Rectangle(
        'R3', 'DecimalRect',
        new Point(0.5, 0.5),
        new Point(3.5, 0.5),
        new Point(3.5, 2.5),
        new Point(0.5, 2.5),
      );
      
      const area = service.calculateArea(rect);
      
      expect(area).toBeCloseTo(6, 5);
    });
  });

  describe('calculatePerimeter', () => {
    test('should calculate perimeter of a rectangle', () => {
      const rect = new Rectangle(
        'R1', 'TestRect',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      
      const perimeter = service.calculatePerimeter(rect);
      
      expect(perimeter).toBeCloseTo(14, 5);
      expect(perimeter).toBeGreaterThan(0);
      expect(typeof perimeter).toBe('number');
    });

    test('should calculate perimeter of a square', () => {
      const square = new Rectangle(
        'R2', 'Square',
        new Point(0, 0),
        new Point(5, 0),
        new Point(5, 5),
        new Point(0, 5),
      );
      
      const perimeter = service.calculatePerimeter(square);
      
      expect(perimeter).toBeCloseTo(20, 5);
    });
  });

  describe('isValidRectangle', () => {
    test('should validate a proper rectangle', () => {
      const rect = new Rectangle(
        'R1', 'ValidRect',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      
      const isValid = service.isValidRectangle(rect);
      
      expect(isValid).toBe(true);
    });

    test('should reject collinear points', () => {
      const invalidRect = new Rectangle(
        'R2', 'InvalidRect',
        new Point(0, 0),
        new Point(1, 0),
        new Point(2, 0),
        new Point(3, 0),
      );
      
      const isValid = service.isValidRectangle(invalidRect);
      
      expect(isValid).toBe(false);
    });

    test('should validate a square as a rectangle', () => {
      const square = new Rectangle(
        'R3', 'Square',
        new Point(0, 0),
        new Point(5, 0),
        new Point(5, 5),
        new Point(0, 5),
      );
      
      const isValid = service.isValidRectangle(square);
      
      expect(isValid).toBe(true);
    });
  });

  describe('isConvex', () => {
    test('should identify convex quadrilateral', () => {
      const rect = new Rectangle(
        'R1', 'ConvexRect',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      
      const isConvex = service.isConvex(rect);
      
      expect(isConvex).toBe(true);
    });
  });

  describe('isSquare', () => {
    test('should identify a square', () => {
      const square = new Rectangle(
        'R1', 'Square',
        new Point(0, 0),
        new Point(5, 0),
        new Point(5, 5),
        new Point(0, 5),
      );
      
      const isSquare = service.isSquare(square);
      
      expect(isSquare).toBe(true);
    });

    test('should reject a non-square rectangle', () => {
      const rect = new Rectangle(
        'R2', 'Rectangle',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      
      const isSquare = service.isSquare(rect);
      
      expect(isSquare).toBe(false);
    });
  });

  describe('isRhombus', () => {
    test('should identify a square as a rhombus', () => {
      const square = new Rectangle(
        'R1', 'Square',
        new Point(0, 0),
        new Point(5, 0),
        new Point(5, 5),
        new Point(0, 5),
      );
      
      const isRhombus = service.isRhombus(square);
      
      expect(isRhombus).toBe(true);
    });

    test('should reject a rectangle that is not a rhombus', () => {
      const rect = new Rectangle(
        'R2', 'Rectangle',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      
      const isRhombus = service.isRhombus(rect);
      
      expect(isRhombus).toBe(false);
    });
  });

  describe('isTrapezoid', () => {
    test('should identify a rectangle as a trapezoid', () => {
      const rect = new Rectangle(
        'R1', 'Rectangle',
        new Point(0, 0),
        new Point(4, 0),
        new Point(4, 3),
        new Point(0, 3),
      );
      
      const isTrapezoid = service.isTrapezoid(rect);
      
      expect(isTrapezoid).toBe(true);
    });
  });
});
