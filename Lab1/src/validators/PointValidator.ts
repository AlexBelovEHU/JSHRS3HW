import { NUMBER_PATTERN } from '../constants/regex.js';

export class PointValidator {
  public isValidNumber(value: string): boolean {
    return NUMBER_PATTERN.test(value) && !isNaN(parseFloat(value));
  }

  public validateCoordinates(x: number, y: number, z?: number): boolean {
    const coordinates = z !== undefined ? [x, y, z] : [x, y];
    return coordinates.every((coord) => Number.isFinite(coord));
  }
}
