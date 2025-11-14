import { Rectangle } from './entities/Rectangle.js';
import { Pyramid } from './entities/Pyramid.js';
import { Point } from './entities/Point.js';
import { RectangleService } from './services/RectangleService.js';
import { PyramidService } from './services/PyramidService.js';

console.log('=== Geometric Shapes Calculator Demo ===\n');

// Rectangle demonstration
console.log('--- Rectangle Example ---');
const rect = new Rectangle(
  'RECT-1',
  'Test Rectangle',
  new Point(0, 0),
  new Point(4, 0),
  new Point(4, 3),
  new Point(0, 3),
);

const rectService = new RectangleService();

console.log('Rectangle:', rect.toString());
console.log('Area:', rectService.calculateArea(rect));
console.log('Perimeter:', rectService.calculatePerimeter(rect));
console.log('Is valid rectangle:', rectService.isValidRectangle(rect));
console.log('Is square:', rectService.isSquare(rect));
console.log('Is rhombus:', rectService.isRhombus(rect));
console.log('Is trapezoid:', rectService.isTrapezoid(rect));
console.log('Is convex:', rectService.isConvex(rect));

// Square demonstration
console.log('\n--- Square Example ---');
const square = new Rectangle(
  'RECT-2',
  'Test Square',
  new Point(0, 0),
  new Point(5, 0),
  new Point(5, 5),
  new Point(0, 5),
);

console.log('Square:', square.toString());
console.log('Area:', rectService.calculateArea(square));
console.log('Perimeter:', rectService.calculatePerimeter(square));
console.log('Is square:', rectService.isSquare(square));

// Pyramid demonstration
console.log('\n--- Pyramid Example ---');
const pyramid = new Pyramid(
  'PYR-1',
  'Test Pyramid',
  new Point(2, 2, 4),
  new Point(0, 0, 0),
  new Point(4, 0, 0),
  new Point(4, 4, 0),
  new Point(0, 4, 0),
);

const pyrService = new PyramidService();

console.log('Pyramid:', pyramid.toString());
console.log('Volume:', pyrService.calculateVolume(pyramid));
console.log('Surface Area:', pyrService.calculateSurfaceArea(pyramid));
console.log('Is valid pyramid:', pyrService.isValidPyramid(pyramid));
console.log('Base on coordinate plane:', pyrService.baseLiesOnCoordinatePlane(pyramid));
console.log('Volume ratio after slicing at z=2:', pyrService.calculateVolumeRatioAfterSlicing(pyramid, 'xy', 2));

console.log('\n=== Demo Complete ===');
