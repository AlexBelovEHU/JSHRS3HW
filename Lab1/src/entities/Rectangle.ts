import { Shape } from './Shape.js';
import { Point } from './Point.js';

export class Rectangle extends Shape {
  public readonly point1: Point;
  public readonly point2: Point;
  public readonly point3: Point;
  public readonly point4: Point;

  constructor(
    id: string,
    name: string,
    point1: Point,
    point2: Point,
    point3: Point,
    point4: Point,
  ) {
    super(id, name);
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.point4 = point4;
  }

  public getPoints(): Point[] {
    return [this.point1, this.point2, this.point3, this.point4];
  }

  public toString(): string {
    return `Rectangle[${this.id}]: ${this.name} - Points: ${this.point1.toString()}, ${this.point2.toString()}, ${this.point3.toString()}, ${this.point4.toString()}`;
  }
}
