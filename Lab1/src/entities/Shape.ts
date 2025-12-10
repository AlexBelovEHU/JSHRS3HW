import { IShapeObserver } from '../observers/IShapeObserver.js';

export abstract class Shape {
  public readonly id: string;
  public readonly name: string;
  private observers: IShapeObserver[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public addObserver(observer: IShapeObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public removeObserver(observer: IShapeObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  protected notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public abstract toString(): string;
}
