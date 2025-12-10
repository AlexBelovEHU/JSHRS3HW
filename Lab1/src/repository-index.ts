// Repository
export { ShapeRepository } from './repositories/ShapeRepository.js';
export type { IShapeRepository } from './repositories/IShapeRepository.js';

// Warehouse (Singleton)
export { Warehouse } from './warehouse/Warehouse.js';

// Specifications
export type { ISpecification } from './specifications/ISpecification.js';
export {
  CompositeSpecification,
  AndSpecification,
  OrSpecification,
  NotSpecification,
} from './specifications/CompositeSpecification.js';
export {
  ByIdSpecification,
  ByNameSpecification,
  ByFirstQuadrantSpecification,
  BySurfaceAreaRangeSpecification,
  ByVolumeRangeSpecification,
  ByPerimeterRangeSpecification,
  ByDistanceFromOriginRangeSpecification,
} from './specifications/ShapeSpecifications.js';

// Comparators
export type { IComparator } from './comparators/ShapeComparators.js';
export {
  IdComparator,
  NameComparator,
  FirstPointXComparator,
  FirstPointYComparator,
  FirstPointZComparator,
} from './comparators/ShapeComparators.js';

// Observer
export type { IShapeObserver } from './observers/IShapeObserver.js';

// Demo
export { demonstrateRepositoryPattern } from './repositoryDemo.js';
