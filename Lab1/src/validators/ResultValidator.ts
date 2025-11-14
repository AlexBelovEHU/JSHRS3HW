import { EPSILON } from '../constants/defaults.js';

export class ResultValidator {
  public isValidArea(area: number): boolean {
    return Number.isFinite(area) && area >= 0;
  }

  public isValidPerimeter(perimeter: number): boolean {
    return Number.isFinite(perimeter) && perimeter >= 0;
  }

  public isValidVolume(volume: number): boolean {
    return Number.isFinite(volume) && volume >= 0;
  }

  public areEqual(value1: number, value2: number): boolean {
    return Math.abs(value1 - value2) < EPSILON;
  }

  public isPositive(value: number): boolean {
    return Number.isFinite(value) && value > 0;
  }
}
