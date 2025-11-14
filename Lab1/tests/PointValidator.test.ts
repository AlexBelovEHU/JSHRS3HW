import { PointValidator } from '../src/validators/PointValidator';

describe('PointValidator', () => {
  let validator: PointValidator;

  beforeEach(() => {
    validator = new PointValidator();
  });

  describe('isValidNumber', () => {
    test('should validate positive integers', () => {
      expect(validator.isValidNumber('123')).toBe(true);
      expect(validator.isValidNumber('0')).toBe(true);
    });

    test('should validate negative numbers', () => {
      expect(validator.isValidNumber('-45')).toBe(true);
      expect(validator.isValidNumber('-0.5')).toBe(true);
    });

    test('should validate decimal numbers', () => {
      expect(validator.isValidNumber('3.14')).toBe(true);
      expect(validator.isValidNumber('0.001')).toBe(true);
      expect(validator.isValidNumber('.5')).toBe(true);
    });

    test('should reject strings with letters', () => {
      expect(validator.isValidNumber('2a.0')).toBe(false);
      expect(validator.isValidNumber('abc')).toBe(false);
      expect(validator.isValidNumber('12.3a')).toBe(false);
    });

    test('should reject strings with special characters', () => {
      expect(validator.isValidNumber('12@3')).toBe(false);
      expect(validator.isValidNumber('1.2.3')).toBe(false);
      expect(validator.isValidNumber('')).toBe(false);
    });

    test('should reject non-numeric strings', () => {
      expect(validator.isValidNumber('NaN')).toBe(false);
      expect(validator.isValidNumber('Infinity')).toBe(false);
    });
  });

  describe('validateCoordinates', () => {
    test('should validate finite 2D coordinates', () => {
      expect(validator.validateCoordinates(1.0, 2.0)).toBe(true);
      expect(validator.validateCoordinates(-5.5, 10.2)).toBe(true);
      expect(validator.validateCoordinates(0, 0)).toBe(true);
    });

    test('should validate finite 3D coordinates', () => {
      expect(validator.validateCoordinates(1.0, 2.0, 3.0)).toBe(true);
      expect(validator.validateCoordinates(-1.5, -2.5, -3.5)).toBe(true);
    });

    test('should reject infinite coordinates', () => {
      expect(validator.validateCoordinates(Infinity, 2.0)).toBe(false);
      expect(validator.validateCoordinates(1.0, -Infinity)).toBe(false);
      expect(validator.validateCoordinates(1.0, 2.0, Infinity)).toBe(false);
    });

    test('should reject NaN coordinates', () => {
      expect(validator.validateCoordinates(NaN, 2.0)).toBe(false);
      expect(validator.validateCoordinates(1.0, NaN)).toBe(false);
      expect(validator.validateCoordinates(1.0, 2.0, NaN)).toBe(false);
    });
  });
});
