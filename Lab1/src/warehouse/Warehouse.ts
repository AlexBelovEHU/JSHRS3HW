import type { IShapeObserver } from '../observers/IShapeObserver.js';
import { Shape } from '../entities/Shape.js';
import { Rectangle } from '../entities/Rectangle.js';
import { Pyramid } from '../entities/Pyramid.js';
import { RectangleService } from '../services/RectangleService.js';
import { PyramidService } from '../services/PyramidService.js';

interface ShapeMetrics {
  area?: number;
  volume?: number;
  perimeter?: number;
}

export class Warehouse implements IShapeObserver {
  private static instance: Warehouse;
  private metrics: Map<string, ShapeMetrics> = new Map();
  private rectangleService: RectangleService;
  private pyramidService: PyramidService;

  private constructor() {
    this.rectangleService = new RectangleService();
    this.pyramidService = new PyramidService();
  }

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public update(shape: Shape): void {
    this.calculateAndStore(shape);
  }

  private calculateAndStore(shape: Shape): void {
    const metrics: ShapeMetrics = {};

    if (shape instanceof Rectangle) {
      metrics.area = this.rectangleService.calculateArea(shape);
      metrics.perimeter = this.rectangleService.calculatePerimeter(shape);
    } else if (shape instanceof Pyramid) {
      metrics.volume = this.pyramidService.calculateVolume(shape);
      metrics.area = this.pyramidService.calculateSurfaceArea(shape);
    }

    this.metrics.set(shape.id, metrics);
  }

  public getMetrics(shapeId: string): ShapeMetrics | undefined {
    return this.metrics.get(shapeId);
  }

  public getArea(shapeId: string): number | undefined {
    return this.metrics.get(shapeId)?.area;
  }

  public getVolume(shapeId: string): number | undefined {
    return this.metrics.get(shapeId)?.volume;
  }

  public getPerimeter(shapeId: string): number | undefined {
    return this.metrics.get(shapeId)?.perimeter;
  }

  public removeMetrics(shapeId: string): void {
    this.metrics.delete(shapeId);
  }

  public getAllMetrics(): Map<string, ShapeMetrics> {
    return new Map(this.metrics);
  }
}
