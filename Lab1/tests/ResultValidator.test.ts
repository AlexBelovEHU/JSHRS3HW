import { ResultValidator } from '../src/validators/ResultValidator';

describe('ResultValidator', () => {
  let validator: ResultValidator;

  beforeEach(() => {
    validator = new ResultValidator();
  });

  describe('isValidArea', () => {
    test('should validate positive areas', () => {
      expect(validator.isValidArea(10.5)).toBe(true);
      expect(validator.isValidArea(0)).toBe(true);
      expect(validator.isValidArea(100)).toBe(true);
    });

    test('should reject negative areas', () => {
      expect(validator.isValidArea(-5)).toBe(false);
      expect(validator.isValidArea(-0.1)).toBe(false);
    });

    test('should reject infinite values', () => {
      expect(validator.isValidArea(Infinity)).toBe(false);
      expect(validator.isValidArea(-Infinity)).toBe(false);
    });

    test('should reject NaN', () => {
      expect(validator.isValidArea(NaN)).toBe(false);
    });
  });

  describe('isValidPerimeter', () => {
    test('should validate positive perimeters', () => {
      expect(validator.isValidPerimeter(20.5)).toBe(true);
      expect(validator.isValidPerimeter(0)).toBe(true);
    });

    test('should reject negative perimeters', () => {
      expect(validator.isValidPerimeter(-10)).toBe(false);
    });
  });

  describe('isValidVolume', () => {
    test('should validate positive volumes', () => {
      expect(validator.isValidVolume(50.0)).toBe(true);
      expect(validator.isValidVolume(0)).toBe(true);
    });

    test('should reject negative volumes', () => {
      expect(validator.isValidVolume(-15)).toBe(false);
    });
  });

  describe('areEqual', () => {
    test('should detect equal values within epsilon', () => {
      expect(validator.areEqual(1.0, 1.0)).toBe(true);
      expect(validator.areEqual(1.0, 1.0 + 1e-11)).toBe(true);
    });

    test('should detect different values outside epsilon', () => {
      expect(validator.areEqual(1.0, 2.0)).toBe(false);
      expect(validator.areEqual(1.0, 1.01)).toBe(false);
    });

    test('should handle negative values', () => {
      expect(validator.areEqual(-1.0, -1.0)).toBe(true);
      expect(validator.areEqual(-1.0, 1.0)).toBe(false);
    });
  });

  describe('isPositive', () => {
    test('should validate positive numbers', () => {
      expect(validator.isPositive(10)).toBe(true);
      expect(validator.isPositive(0.001)).toBe(true);
    });

    test('should reject zero', () => {
      expect(validator.isPositive(0)).toBe(false);
    });

    test('should reject negative numbers', () => {
      expect(validator.isPositive(-5)).toBe(false);
    });

    test('should reject invalid numbers', () => {
      expect(validator.isPositive(NaN)).toBe(false);
      expect(validator.isPositive(Infinity)).toBe(false);
    });
  });
});
