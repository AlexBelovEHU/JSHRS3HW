# Geometric Shapes Calculator - Lab 1

A comprehensive TypeScript application for calculating properties of geometric shapes (Rectangles and Pyramids) with full validation, testing, and logging capabilities.

## 📋 Project Overview

This project implements a geometric shapes calculator that can:
- Read shape data from text files
- Validate input data
- Calculate various properties (area, perimeter, volume, surface area)
- Determine shape characteristics (square, rhombus, trapezoid, etc.)
- Log all operations
- Provide comprehensive test coverage

## 🎯 Features Implemented

### Rectangle Operations
- ✅ Calculate area and perimeter
- ✅ Validate if points form a proper rectangle (not collinear)
- ✅ Check if quadrilateral is convex
- ✅ Identify if shape is a square
- ✅ Identify if shape is a rhombus
- ✅ Identify if shape is a trapezoid

### Pyramid Operations
- ✅ Calculate surface area
- ✅ Calculate volume
- ✅ Calculate volume ratio after slicing by coordinate plane
- ✅ Validate if object is a proper pyramid
- ✅ Check if base lies on any coordinate plane (xy, xz, yz)

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

### Run Application
```bash
npm run demo          # Run demo with hardcoded examples
npm start             # Run main app (reads from data files)
```

### Code Quality
```bash
npm run lint          # Check code quality
```

## 📊 Test Results

**All 64 tests passing! ✅**

```
Test Suites: 6 passed, 6 total
Tests:       64 passed, 64 total
Time:        ~1.4s
```

Test coverage includes:
- Point entity (4 tests)
- PointValidator (10 tests)
- ResultValidator (14 tests)
- RectangleFactory (10 tests)
- RectangleService (14 tests)
- PyramidService (11 tests)

## 📁 Project Structure

```
Lab1/
├── src/
│   ├── entities/          # Entity classes (no business logic)
│   │   ├── Point.ts
│   │   ├── Shape.ts
│   │   ├── Rectangle.ts
│   │   └── Pyramid.ts
│   ├── factories/         # Factory Method pattern
│   │   ├── ShapeFactory.ts
│   │   ├── RectangleFactory.ts
│   │   └── PyramidFactory.ts
│   ├── services/          # Business logic (calculations)
│   │   ├── RectangleService.ts
│   │   └── PyramidService.ts
│   ├── validators/        # Input & result validation
│   │   ├── PointValidator.ts
│   │   └── ResultValidator.ts
│   ├── exceptions/        # Custom exception classes
│   │   ├── ValidationError.ts
│   │   ├── InvalidShapeError.ts
│   │   └── FileReadError.ts
│   ├── utils/            # Utilities
│   │   ├── FileReader.ts
│   │   └── logger.ts
│   ├── constants/        # Constants & regex patterns
│   │   ├── regex.ts
│   │   └── defaults.ts
│   ├── app.ts            # Main application
│   └── demo.ts           # Demo script
├── tests/                # Jest unit tests
├── data/                 # Input data files
│   ├── rectangles.txt
│   └── pyramids.txt
├── logs/                 # Application logs
└── package.json
```

## 📝 Data File Format

### Rectangles (`data/rectangles.txt`)
Format: `x1 y1 x2 y2 x3 y3 x4 y4`

```
# Valid examples
0 0 4 0 4 3 0 3        # 4x3 rectangle
0 0 5 0 5 5 0 5        # 5x5 square
-2 -2 2 -2 2 2 -2 2    # Rectangle with negative coords

# Invalid examples (will be skipped)
2a.0 3.0 4.1 5.0 ...   # Contains letter
1.0 2.0                 # Not enough data
0 0 1 0 2 0 3 0         # Collinear points
```

### Pyramids (`data/pyramids.txt`)
Format: `apex_x apex_y apex_z base1_x base1_y base1_z ... base4_x base4_y base4_z`

```
# Valid example
2 2 4 0 0 0 4 0 0 4 4 0 0 4 0

# Invalid examples (will be skipped)
2a.0 3.0 ...           # Contains letter
1.0 2.0 3.0 ...        # Not enough data
```

## 🏗️ Architecture & Design Patterns

### Factory Method Pattern
Used for creating shape instances with validation:
- `RectangleFactory` - Creates Rectangle objects
- `PyramidFactory` - Creates Pyramid objects

### Service Layer Pattern
Separates business logic from entities:
- Entity classes contain only data
- Service classes contain all calculations

### Validator Pattern
Validates input and results:
- `PointValidator` - Validates point data
- `ResultValidator` - Validates calculation results

## ✅ Requirements Met

### General Requirements
- ✅ Classes Point and Shape created
- ✅ Factory Method pattern implemented
- ✅ Entity classes without business logic
- ✅ Shapes have unique id and name fields
- ✅ Data read from .txt files with validation
- ✅ Invalid lines skipped with logging
- ✅ Files within project folders (relative paths)

### Technical Requirements
- ✅ Organized directory structure
- ✅ Custom exception classes
- ✅ Pino library for logging (console + file)
- ✅ Jest unit tests (64 tests, multiple expects per test)
- ✅ TypeScript strict mode
- ✅ ESLint configuration
- ✅ Proper static typing
- ✅ ES6 modules
- ✅ UPPERCASE constants for immutable values
- ✅ Regex patterns in constants
- ✅ Custom exceptions only
- ✅ try/catch error handling

## 🔧 Technologies Used

### Core
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment

### Testing
- **Jest** - Testing framework
- **ts-jest** - TypeScript preprocessor for Jest

### Logging
- **Pino** - Fast JSON logger
- **pino-pretty** - Pretty console output

### Development
- **ESLint** - Code linting
- **tsx** - TypeScript execution
- **ts-node** - TypeScript node execution

## 📖 Example Output

```
=== Geometric Shapes Calculator Demo ===

--- Rectangle Example ---
Area: 12
Perimeter: 14
Is valid rectangle: true
Is square: false
Is rhombus: false
Is trapezoid: true
Is convex: true

--- Square Example ---
Area: 25
Perimeter: 20
Is square: true

--- Pyramid Example ---
Volume: 21.333333333333332
Surface Area: 51.77708763999664
Is valid pyramid: true
Base on coordinate plane: xy
Volume ratio after slicing at z=2: 0.125
```

## 📚 Additional Documentation

- `PROJECT_README.md` - Detailed technical documentation
- `IMPLEMENTATION_SUMMARY.md` - Complete requirements checklist

## 👨‍💻 Development

### Adding New Shapes
1. Create entity class in `src/entities/`
2. Create factory in `src/factories/`
3. Create service in `src/services/`
4. Add tests in `tests/`
5. Update FileReader if needed

### Code Style Guidelines
- Use TypeScript strict mode
- Follow ESLint rules
- Write comprehensive tests
- Document complex algorithms
- Use meaningful variable names

## 📄 License

MIT

## 👤 Author

Created for University Lab Assignment - JSHRS3HW
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
