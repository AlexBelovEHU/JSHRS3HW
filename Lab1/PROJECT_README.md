# Geometric Shapes Calculator - Lab 1

A TypeScript application for calculating properties of geometric shapes (Rectangles and Pyramids) with comprehensive validation and testing.

## Features

- **Rectangle Operations**:
  - Calculate area and perimeter
  - Validate if points form a proper rectangle
  - Check if quadrilateral is convex
  - Identify if shape is a square, rhombus, or trapezoid
  - Detect collinear points

- **Pyramid Operations**:
  - Calculate surface area and volume
  - Calculate volume ratio after slicing by coordinate plane
  - Validate if object is a proper pyramid
  - Check if base lies on any coordinate plane

## Project Structure

```
Lab1/
├── src/
│   ├── entities/          # Entity classes (Point, Shape, Rectangle, Pyramid)
│   ├── factories/         # Factory pattern implementations
│   ├── services/          # Business logic services
│   ├── validators/        # Input and result validators
│   ├── exceptions/        # Custom exception classes
│   ├── utils/            # Utility classes (FileReader, Logger)
│   ├── constants/        # Constants and regex patterns
│   └── app.ts            # Main application entry point
├── tests/                # Unit tests (Jest)
├── data/                 # Input data files
│   ├── rectangles.txt
│   └── pyramids.txt
├── logs/                 # Application logs
└── package.json
```

## Technical Implementation

### Design Patterns
- **Factory Method Pattern**: Used for creating shape instances
- **Service Layer Pattern**: Separates business logic from entities
- **Validator Pattern**: Validates input and computed results

### Key Features
- ✅ Entity classes contain NO business logic
- ✅ Each shape has a unique ID and name
- ✅ File reader skips invalid lines with logging
- ✅ Custom exception classes for error handling
- ✅ Logging to both console and file using Pino
- ✅ Comprehensive unit tests with Jest (64 tests, 100% pass rate)
- ✅ TypeScript strict mode enabled
- ✅ ESLint configuration for code quality

## Requirements Met

### General Requirements
- ✅ Classes Point and Shape created
- ✅ Factory Method pattern for entity creation
- ✅ Entity classes without business logic
- ✅ Shapes have id and name fields
- ✅ Data read from .txt files with validation
- ✅ Invalid lines are skipped with logging
- ✅ Files are within project folders (relative paths)

### Technical Requirements
- ✅ Organized directory structure
- ✅ Custom exception classes (ValidationError, InvalidShapeError, FileReadError)
- ✅ Pino library for logging (console + file)
- ✅ Jest unit tests with multiple expects per test
- ✅ TypeScript conventions and ESLint
- ✅ Proper static typing
- ✅ ES6 modules
- ✅ UPPERCASE constants for immutable values
- ✅ Regex patterns stored in constants
- ✅ Custom exceptions (never throw standard exceptions)
- ✅ try/catch for exception handling

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Running the Application

```bash
npm start
```

The application will:
1. Read rectangle data from `data/rectangles.txt`
2. Process each valid rectangle and calculate its properties
3. Read pyramid data from `data/pyramids.txt`
4. Process each valid pyramid and calculate its properties
5. Log results to console and `logs/app.log`

## Data File Format

### Rectangles (`data/rectangles.txt`)
Format: `x1 y1 x2 y2 x3 y3 x4 y4`

Example:
```
0 0 4 0 4 3 0 3        # Valid 4x3 rectangle
0 0 5 0 5 5 0 5        # Valid 5x5 square
2a.0 3.0 4.1 5.0 ...   # Invalid: forbidden symbol
1.0 2.0                 # Invalid: not enough data
```

### Pyramids (`data/pyramids.txt`)
Format: `apex_x apex_y apex_z base1_x base1_y base1_z base2_x base2_y base2_z base3_x base3_y base3_z base4_x base4_y base4_z`

Example:
```
2 2 4 0 0 0 4 0 0 4 4 0 0 4 0     # Valid pyramid with square base
0.5 0.5 1 0 0 0 1 0 0 1 1 0 0 1 0 # Valid unit pyramid
```

## Test Coverage

The project includes 64 unit tests covering:
- Point entity creation and methods
- Validator classes (PointValidator, ResultValidator)
- Factory classes (RectangleFactory, PyramidFactory)
- Service classes (RectangleService, PyramidService)

All tests use multiple `expect` statements per test case as required.

## Code Quality

- TypeScript strict mode enabled
- ESLint with modern configuration
- No unused variables or parameters
- Proper error handling with custom exceptions
- Comprehensive logging

## Dependencies

### Production
- `pino`: Fast logging library
- `pino-pretty`: Pretty printing for Pino logs

### Development
- `typescript`: TypeScript compiler
- `jest`: Testing framework
- `ts-jest`: TypeScript preprocessor for Jest
- `@types/jest`: TypeScript types for Jest
- `@types/node`: TypeScript types for Node.js
- `eslint`: Linting utility
- `ts-node`: TypeScript execution for Node.js

## Author

Created for University Lab Assignment - JSHRS3HW

## License

MIT
