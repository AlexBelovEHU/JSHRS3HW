import { Shape } from './Shape.js';
import { Point } from './Point.js';

export class Pyramid extends Shape {
  public readonly apex: Point;
  public readonly base1: Point;
  public readonly base2: Point;
  public readonly base3: Point;
  public readonly base4: Point;

  constructor(
    id: string,
    name: string,
    apex: Point,
    base1: Point,
    base2: Point,
    base3: Point,
    base4: Point,
  ) {
    super(id, name);
    this.apex = apex;
    this.base1 = base1;
    this.base2 = base2;
    this.base3 = base3;
    this.base4 = base4;
  }

  public getBasePoints(): Point[] {
    return [this.base1, this.base2, this.base3, this.base4];
  }

  public toString(): string {
    return `Pyramid[${this.id}]: ${this.name} - Apex: ${this.apex.toString()}, Base: ${this.base1.toString()}, ${this.base2.toString()}, ${this.base3.toString()}, ${this.base4.toString()}`;
  }
}
