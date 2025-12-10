import { ShapeRepository } from './repositories/ShapeRepository.js';
import { Rectangle } from './entities/Rectangle.js';
import { Pyramid } from './entities/Pyramid.js';
import { Point } from './entities/Point.js';
import { Warehouse } from './warehouse/Warehouse.js';
import {
  ByIdSpecification,
  ByNameSpecification,
  ByFirstQuadrantSpecification,
  BySurfaceAreaRangeSpecification,
  ByVolumeRangeSpecification,
  ByPerimeterRangeSpecification,
  ByDistanceFromOriginRangeSpecification,
} from './specifications/ShapeSpecifications.js';
import {
  IdComparator,
  NameComparator,
  FirstPointXComparator,
  FirstPointYComparator,
} from './comparators/ShapeComparators.js';
import { Shape } from './entities/Shape.js';

// Example usage of Repository pattern with Warehouse and Specifications

export function demonstrateRepositoryPattern(): void {
  // Create repository
  const repository = new ShapeRepository<Shape>();
  const warehouse = Warehouse.getInstance();

  // Create some rectangles
  const rect1 = new Rectangle(
    'rect1',
    'Small Rectangle',
    new Point(1, 1, 0),
    new Point(4, 1, 0),
    new Point(4, 3, 0),
    new Point(1, 3, 0),
  );

  const rect2 = new Rectangle(
    'rect2',
    'Large Rectangle',
    new Point(2, 2, 0),
    new Point(8, 2, 0),
    new Point(8, 7, 0),
    new Point(2, 7, 0),
  );

  // Create some pyramids
  const pyramid1 = new Pyramid(
    'pyr1',
    'Small Pyramid',
    new Point(3, 3, 5),
    new Point(1, 1, 0),
    new Point(5, 1, 0),
    new Point(5, 5, 0),
    new Point(1, 5, 0),
  );

  const pyramid2 = new Pyramid(
    'pyr2',
    'Large Pyramid',
    new Point(5, 5, 10),
    new Point(0, 0, 0),
    new Point(10, 0, 0),
    new Point(10, 10, 0),
    new Point(0, 10, 0),
  );

  // Add shapes to repository (automatically registers with Warehouse)
  console.log('\n=== Adding shapes to repository ===');
  repository.add(rect1);
  repository.add(rect2);
  repository.add(pyramid1);
  repository.add(pyramid2);
  console.log(`Total shapes in repository: ${repository.getCount()}`);

  // Find by ID
  console.log('\n=== Find by ID ===');
  const foundById = repository.findBySpecification(new ByIdSpecification('rect1'));
  console.log(`Found by ID 'rect1':`, foundById.map(s => s.toString()));

  // Find by name
  console.log('\n=== Find by Name ===');
  const foundByName = repository.findBySpecification(new ByNameSpecification('Small Pyramid'));
  console.log(`Found by name 'Small Pyramid':`, foundByName.map(s => s.toString()));

  // Find shapes in first quadrant
  console.log('\n=== Find shapes in first quadrant ===');
  const firstQuadrantShapes = repository.findBySpecification(new ByFirstQuadrantSpecification());
  console.log(`Shapes in first quadrant: ${firstQuadrantShapes.length}`);
  firstQuadrantShapes.forEach(s => console.log(`  - ${s.toString()}`));

  // Find by surface area range
  console.log('\n=== Find by surface area range (0-50) ===');
  const byAreaShapes = repository.findBySpecification(new BySurfaceAreaRangeSpecification(0, 50));
  console.log(`Shapes with area 0-50: ${byAreaShapes.length}`);
  byAreaShapes.forEach(s => {
    const area = warehouse.getArea(s.id);
    console.log(`  - ${s.id}: area = ${area?.toFixed(2)}`);
  });

  // Find by volume range
  console.log('\n=== Find by volume range (0-200) ===');
  const byVolumeShapes = repository.findBySpecification(new ByVolumeRangeSpecification(0, 200));
  console.log(`Shapes with volume 0-200: ${byVolumeShapes.length}`);
  byVolumeShapes.forEach(s => {
    const volume = warehouse.getVolume(s.id);
    console.log(`  - ${s.id}: volume = ${volume?.toFixed(2)}`);
  });

  // Find by perimeter range
  console.log('\n=== Find by perimeter range (0-25) ===');
  const byPerimeterShapes = repository.findBySpecification(new ByPerimeterRangeSpecification(0, 25));
  console.log(`Shapes with perimeter 0-25: ${byPerimeterShapes.length}`);
  byPerimeterShapes.forEach(s => {
    const perimeter = warehouse.getPerimeter(s.id);
    console.log(`  - ${s.id}: perimeter = ${perimeter?.toFixed(2)}`);
  });

  // Find by distance from origin
  console.log('\n=== Find by distance from origin (0-10) ===');
  const byDistanceShapes = repository.findBySpecification(
    new ByDistanceFromOriginRangeSpecification(0, 10),
  );
  console.log(`Shapes with distance from origin 0-10: ${byDistanceShapes.length}`);
  byDistanceShapes.forEach(s => console.log(`  - ${s.toString()}`));

  // Combine specifications using AND
  console.log('\n=== Combine specifications (First Quadrant AND Area 0-50) ===');
  const combinedSpec = new ByFirstQuadrantSpecification<Shape>().and(
    new BySurfaceAreaRangeSpecification(0, 50),
  );
  const combinedResult = repository.findBySpecification(combinedSpec);
  console.log(`Shapes in first quadrant with area 0-50: ${combinedResult.length}`);
  combinedResult.forEach(s => console.log(`  - ${s.toString()}`));

  // Sort by ID
  console.log('\n=== Sort by ID ===');
  const sortedById = repository.sort((a, b) => new IdComparator().compare(a, b));
  console.log('Shapes sorted by ID:');
  sortedById.forEach(s => console.log(`  - ${s.id}: ${s.name}`));

  // Sort by Name
  console.log('\n=== Sort by Name ===');
  const sortedByName = repository.sort((a, b) => new NameComparator().compare(a, b));
  console.log('Shapes sorted by Name:');
  sortedByName.forEach(s => console.log(`  - ${s.name} (${s.id})`));

  // Sort by first point X coordinate
  console.log('\n=== Sort by first point X coordinate ===');
  const sortedByX = repository.sort((a, b) => new FirstPointXComparator().compare(a, b));
  console.log('Shapes sorted by X coordinate:');
  sortedByX.forEach(s => console.log(`  - ${s.toString()}`));

  // Sort by first point Y coordinate
  console.log('\n=== Sort by first point Y coordinate ===');
  const sortedByY = repository.sort((a, b) => new FirstPointYComparator().compare(a, b));
  console.log('Shapes sorted by Y coordinate:');
  sortedByY.forEach(s => console.log(`  - ${s.toString()}`));

  // Display all warehouse metrics
  console.log('\n=== Warehouse Metrics ===');
  const allMetrics = warehouse.getAllMetrics();
  for (const [id, metrics] of allMetrics.entries()) {
    console.log(`${id}:`);
    if (metrics.area !== undefined) console.log(`  Area: ${metrics.area.toFixed(2)}`);
    if (metrics.volume !== undefined) console.log(`  Volume: ${metrics.volume.toFixed(2)}`);
    if (metrics.perimeter !== undefined) console.log(`  Perimeter: ${metrics.perimeter.toFixed(2)}`);
  }

  // Remove a shape
  console.log('\n=== Remove shape ===');
  const removed = repository.remove('rect1');
  console.log(`Removed rect1: ${removed}`);
  console.log(`Total shapes in repository: ${repository.getCount()}`);
  console.log(`rect1 metrics in warehouse:`, warehouse.getMetrics('rect1'));
}
