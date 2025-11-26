import { RectangleFactory } from '../src/factories/RectangleFactory';
import { Rectangle } from '../src/entities/Rectangle';

describe('RectangleFactory', () => {
  let factory: RectangleFactory;

  beforeEach(() => {
    factory = RectangleFactory.getInstance();
  });

  describe('validateData', () => {
    test('should validate correct rectangle data', () => {
      const validData = ['0', '0', '4', '0', '4', '3', '0', '3'];
      
      expect(factory.validateData(validData)).toBe(true);
    });

    test('should reject data with wrong length', () => {
      const shortData = ['0', '0', '4', '0'];
      const longData = ['0', '0', '4', '0', '4', '3', '0', '3', '5'];
      
      expect(factory.validateData(shortData)).toBe(false);
      expect(factory.validateData(longData)).toBe(false);
    });

    test('should reject data with invalid numbers', () => {
      const invalidData = ['0', '0', '4a', '0', '4', '3', '0', '3'];
      
      expect(factory.validateData(invalidData)).toBe(false);
    });

    test('should accept negative coordinates', () => {
      const negativeData = ['-1', '-1', '3', '-1', '3', '2', '-1', '2'];
      
      expect(factory.validateData(negativeData)).toBe(true);
    });

    test('should accept decimal coordinates', () => {
      const decimalData = ['0.5', '0.5', '4.5', '0.5', '4.5', '3.5', '0.5', '3.5'];
      
      expect(factory.validateData(decimalData)).toBe(true);
    });
  });

  describe('createShape', () => {
    test('should create rectangle from valid data', () => {
      const validData = ['0', '0', '4', '0', '4', '3', '0', '3'];
      
      const rectangle = factory.createShape(validData);
      
      expect(rectangle).not.toBeNull();
      expect(rectangle).toBeInstanceOf(Rectangle);
      expect(rectangle?.point1.x).toBe(0);
      expect(rectangle?.point1.y).toBe(0);
      expect(rectangle?.id).toContain('RECT-');
    });

    test('should return null for invalid data', () => {
      const invalidData = ['0', '0', '4a', '0'];
      
      const rectangle = factory.createShape(invalidData);
      
      expect(rectangle).toBeNull();
    });

    test('should create rectangles with unique IDs', () => {
      const data1 = ['0', '0', '4', '0', '4', '3', '0', '3'];
      const data2 = ['1', '1', '5', '1', '5', '4', '1', '4'];
      
      const rect1 = factory.createShape(data1);
      const rect2 = factory.createShape(data2);
      
      expect(rect1?.id).not.toBe(rect2?.id);
    });

    test('should handle decimal coordinates', () => {
      const decimalData = ['0.5', '0.5', '4.5', '0.5', '4.5', '3.5', '0.5', '3.5'];
      
      const rectangle = factory.createShape(decimalData);
      
      expect(rectangle).not.toBeNull();
      expect(rectangle?.point1.x).toBe(0.5);
      expect(rectangle?.point1.y).toBe(0.5);
    });

    test('should handle negative coordinates', () => {
      const negativeData = ['-2', '-2', '2', '-2', '2', '2', '-2', '2'];
      
      const rectangle = factory.createShape(negativeData);
      
      expect(rectangle).not.toBeNull();
      expect(rectangle?.point1.x).toBe(-2);
      expect(rectangle?.point1.y).toBe(-2);
    });
  });
});
