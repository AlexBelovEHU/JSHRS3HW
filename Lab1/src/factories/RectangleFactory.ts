import type { ShapeFactory } from './ShapeFactory.js';
import { Rectangle } from '../entities/Rectangle.js';
import { Point } from '../entities/Point.js';
import { PointValidator } from '../validators/PointValidator.js';

export class RectangleFactory implements ShapeFactory {
  private static instanceCounter = 0;
  private readonly pointValidator: PointValidator;

  constructor() {
    this.pointValidator = new PointValidator();
  }

  public validateData(data: string[]): boolean {
    if (data.length !== 8) {
      return false;
    }

    for (const value of data) {
      if (!this.pointValidator.isValidNumber(value)) {
        return false;
      }
    }

    return true;
  }

  public createShape(data: string[]): Rectangle | null {
    if (!this.validateData(data)) {
      return null;
    }

    try {
      const x1 = parseFloat(data[0]);
      const y1 = parseFloat(data[1]);
      const x2 = parseFloat(data[2]);
      const y2 = parseFloat(data[3]);
      const x3 = parseFloat(data[4]);
      const y3 = parseFloat(data[5]);
      const x4 = parseFloat(data[6]);
      const y4 = parseFloat(data[7]);

      const point1 = new Point(x1, y1);
      const point2 = new Point(x2, y2);
      const point3 = new Point(x3, y3);
      const point4 = new Point(x4, y4);

      RectangleFactory.instanceCounter += 1;
      const id = `RECT-${RectangleFactory.instanceCounter}`;
      const name = `Rectangle ${RectangleFactory.instanceCounter}`;

      return new Rectangle(id, name, point1, point2, point3, point4);
    } catch (error) {
      return null;
    }
  }
}
