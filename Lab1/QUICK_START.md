# Quick Usage Guide

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests (Recommended First!)
```bash
npm test
```
**Expected Output:** All 64 tests should pass ✅

### 3. Run Demo (See It Work!)
```bash
npm run demo
```
**Expected Output:** Console output showing calculations for rectangles and pyramids

### 4. Run Main Application (Process Files)
```bash
npm start
```
**Expected Output:** Processes shapes from `data/rectangles.txt` and `data/pyramids.txt`, logs results

## Understanding the Output

### Rectangle Demo Output
```
Area: 12                    # Width × Height (4 × 3)
Perimeter: 14               # Sum of all sides
Is valid rectangle: true    # Points form valid rectangle
Is square: false            # Sides are not equal
Is rhombus: false          # All sides not equal
Is trapezoid: true         # Has parallel sides
Is convex: true            # No internal angles > 180°
```

### Pyramid Demo Output
```
Volume: 21.33              # (1/3) × Base Area × Height
Surface Area: 51.78        # Base + 4 triangular faces
Is valid pyramid: true     # Base is planar, apex above
Base on coordinate plane: xy  # Base lies on XY plane
Volume ratio: 0.125        # Ratio after slicing
```

## Modifying Input Data

### Edit Rectangle Data
Open `data/rectangles.txt` and add lines in format:
```
x1 y1 x2 y2 x3 y3 x4 y4
```

Example:
```
0 0 4 0 4 3 0 3    # Valid rectangle
```

### Edit Pyramid Data
Open `data/pyramids.txt` and add lines in format:
```
apex_x apex_y apex_z base1_x base1_y base1_z base2_x base2_y base2_z base3_x base3_y base3_z base4_x base4_y base4_z
```

Example:
```
2 2 4 0 0 0 4 0 0 4 4 0 0 4 0    # Pyramid with apex at (2,2,4)
```

## Viewing Logs

After running the application, check:
```
logs/app.log
```

This file contains detailed logs of all operations.

## Running Individual Tests

```bash
# Run specific test file
npm test Point.test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Common Issues

### Issue: Tests fail
**Solution:** Make sure all dependencies are installed:
```bash
npm install
```

### Issue: Cannot find data files
**Solution:** Make sure you're running from the Lab1 directory:
```bash
cd Lab1
npm start
```

### Issue: Logs not appearing
**Solution:** Pino logs asynchronously. Check `logs/app.log` file or use the demo which logs to console.

## Next Steps

1. ✅ Verify all tests pass: `npm test`
2. ✅ Run the demo: `npm run demo`
3. ✅ Modify data files and run: `npm start`
4. ✅ Check logs: `logs/app.log`
5. ✅ Explore the code in `src/`

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run demo` | Run demo with examples |
| `npm start` | Process data files |
| `npm run lint` | Check code quality |
| `npm run test:coverage` | Test with coverage |

## File Structure Quick Reference

```
Lab1/
├── src/
│   ├── entities/       # Data structures
│   ├── services/       # Business logic
│   ├── factories/      # Object creation
│   └── app.ts         # Main entry point
├── tests/             # Unit tests
├── data/              # Input files (edit these!)
└── logs/              # Output logs (check these!)
```

## Getting Help

1. Read the detailed README.md
2. Check IMPLEMENTATION_SUMMARY.md for requirements
3. Review PROJECT_README.md for technical details
4. Look at test files in `tests/` for usage examples
