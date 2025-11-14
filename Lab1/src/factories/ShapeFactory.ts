import { Shape } from '../entities/Shape.js';

export interface ShapeFactory {
  createShape(data: string[]): Shape | null;
  validateData(data: string[]): boolean;
}
