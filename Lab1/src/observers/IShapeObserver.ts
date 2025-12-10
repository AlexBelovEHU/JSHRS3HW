import { Shape } from '../entities/Shape.js';

export interface IShapeObserver {
  update(shape: Shape): void;
}
