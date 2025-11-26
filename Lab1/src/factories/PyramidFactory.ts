import type { ShapeFactory } from './ShapeFactory.js';
import { Pyramid } from '../entities/Pyramid.js';
import { Point } from '../entities/Point.js';
import { PointValidator } from '../validators/PointValidator.js';

export class PyramidFactory implements ShapeFactory {
  private static instance: PyramidFactory | null = null;
  private static instanceCounter = 0;
  private readonly pointValidator: PointValidator;

  private constructor() {
    this.pointValidator = new PointValidator();
  }

  public static getInstance(): PyramidFactory {
    if (PyramidFactory.instance === null) {
      PyramidFactory.instance = new PyramidFactory();
    }
    return PyramidFactory.instance;
  }

  public validateData(data: string[]): boolean {
    if (data.length !== 15) {
      return false;
    }

    for (const value of data) {
      if (!this.pointValidator.isValidNumber(value)) {
        return false;
      }
    }

    return true;
  }

  public createShape(data: string[]): Pyramid | null {
    if (!this.validateData(data)) {
      return null;
    }

    try {
      const apexX = parseFloat(data[0]);
      const apexY = parseFloat(data[1]);
      const apexZ = parseFloat(data[2]);

      const base1X = parseFloat(data[3]);
      const base1Y = parseFloat(data[4]);
      const base1Z = parseFloat(data[5]);

      const base2X = parseFloat(data[6]);
      const base2Y = parseFloat(data[7]);
      const base2Z = parseFloat(data[8]);

      const base3X = parseFloat(data[9]);
      const base3Y = parseFloat(data[10]);
      const base3Z = parseFloat(data[11]);

      const base4X = parseFloat(data[12]);
      const base4Y = parseFloat(data[13]);
      const base4Z = parseFloat(data[14]);

      const apex = new Point(apexX, apexY, apexZ);
      const base1 = new Point(base1X, base1Y, base1Z);
      const base2 = new Point(base2X, base2Y, base2Z);
      const base3 = new Point(base3X, base3Y, base3Z);
      const base4 = new Point(base4X, base4Y, base4Z);

      PyramidFactory.instanceCounter += 1;
      const id = `PYR-${PyramidFactory.instanceCounter}`;
      const name = `Pyramid ${PyramidFactory.instanceCounter}`;

      return new Pyramid(id, name, apex, base1, base2, base3, base4);
    } catch (error) {
      return null;
    }
  }
}
