import { Shape } from '../entities/Shape.js';
import type { IShapeRepository } from './IShapeRepository.js';
import type { ISpecification } from '../specifications/ISpecification.js';
import { Warehouse } from '../warehouse/Warehouse.js';

export class ShapeRepository<T extends Shape> implements IShapeRepository<T> {
  private shapes: Map<string, T> = new Map();
  private warehouse: Warehouse;

  constructor() {
    this.warehouse = Warehouse.getInstance();
  }

  public add(shape: T): void {
    if (this.shapes.has(shape.id)) {
      throw new Error(`Shape with id ${shape.id} already exists in repository`);
    }
    
    shape.addObserver(this.warehouse);
    
    this.shapes.set(shape.id, shape);
    
    this.warehouse.update(shape);
  }

  public remove(id: string): boolean {
    const shape = this.shapes.get(id);
    if (!shape) {
      return false;
    }

    shape.removeObserver(this.warehouse);
    this.warehouse.removeMetrics(id);
    
    return this.shapes.delete(id);
  }

  public removeAll(): void {
    for (const shape of this.shapes.values()) {
      shape.removeObserver(this.warehouse);
      this.warehouse.removeMetrics(shape.id);
    }
    this.shapes.clear();
  }

  public findById(id: string): T | undefined {
    return this.shapes.get(id);
  }

  public findAll(): T[] {
    return Array.from(this.shapes.values());
  }

  public findBySpecification(spec: ISpecification<T>): T[] {
    return this.findAll().filter(shape => spec.isSatisfiedBy(shape));
  }

  public sort(comparator: (a: T, b: T) => number): T[] {
    return this.findAll().sort(comparator);
  }

  public getCount(): number {
    return this.shapes.size;
  }
}
