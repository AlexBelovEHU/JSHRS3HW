import { FileReader } from './utils/FileReader.js';
import { RectangleService } from './services/RectangleService.js';
import { PyramidService } from './services/PyramidService.js';
import { Rectangle } from './entities/Rectangle.js';
import { Pyramid } from './entities/Pyramid.js';
import { logger } from './utils/logger.js';
import { ResultValidator } from './validators/ResultValidator.js';

export class Application {
  private readonly fileReader: FileReader;
  private readonly rectangleService: RectangleService;
  private readonly pyramidService: PyramidService;
  private readonly resultValidator: ResultValidator;

  constructor(
    fileReader?: FileReader,
    rectangleService?: RectangleService,
    pyramidService?: PyramidService,
    resultValidator?: ResultValidator,
  ) {
    this.fileReader = fileReader ?? new FileReader();
    this.rectangleService = rectangleService ?? new RectangleService();
    this.pyramidService = pyramidService ?? new PyramidService();
    this.resultValidator = resultValidator ?? new ResultValidator();
  }

  public run(): void {
    try {
      logger.info('Application started');

      this.processRectangles();

      this.processPyramids();

      logger.info('Application finished successfully');
    } catch (error) {
      logger.error(`Application error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private processRectangles(): void {
    try {
      logger.info('=== Processing Rectangles ===');
      const rectangles = this.fileReader.readShapesFromFile('rectangles.txt', 'rectangle');

      for (const shape of rectangles) {
        if (!(shape instanceof Rectangle)) {
          continue;
        }

        logger.info(`\nProcessing ${shape.id}: ${shape.name}`);

        try {
          const area = this.rectangleService.calculateArea(shape);
          if (this.resultValidator.isValidArea(area)) {
            logger.info(`  Area: ${area.toFixed(4)}`);
          }

          const perimeter = this.rectangleService.calculatePerimeter(shape);
          if (this.resultValidator.isValidPerimeter(perimeter)) {
            logger.info(`  Perimeter: ${perimeter.toFixed(4)}`);
          }

          const isValid = this.rectangleService.isValidRectangle(shape);
          logger.info(`  Is valid rectangle: ${isValid}`);

          if (isValid) {
            const isSquare = this.rectangleService.isSquare(shape);
            logger.info(`  Is square: ${isSquare}`);

            const isRhombus = this.rectangleService.isRhombus(shape);
            logger.info(`  Is rhombus: ${isRhombus}`);

            const isTrapezoid = this.rectangleService.isTrapezoid(shape);
            logger.info(`  Is trapezoid: ${isTrapezoid}`);

            const isConvex = this.rectangleService.isConvex(shape);
            logger.info(`  Is convex: ${isConvex}`);
          }
        } catch (error) {
          logger.error(`Error processing rectangle ${shape.id}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

      logger.info(`\nTotal rectangles processed: ${rectangles.length}`);
    } catch (error) {
      logger.error(`Error in rectangle processing: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private processPyramids(): void {
    try {
      logger.info('\n=== Processing Pyramids ===');
      const pyramids = this.fileReader.readShapesFromFile('pyramids.txt', 'pyramid');

      for (const shape of pyramids) {
        if (!(shape instanceof Pyramid)) {
          continue;
        }

        logger.info(`\nProcessing ${shape.id}: ${shape.name}`);

        try {
          const volume = this.pyramidService.calculateVolume(shape);
          if (this.resultValidator.isValidVolume(volume)) {
            logger.info(`  Volume: ${volume.toFixed(4)}`);
          }

          const surfaceArea = this.pyramidService.calculateSurfaceArea(shape);
          if (this.resultValidator.isValidArea(surfaceArea)) {
            logger.info(`  Surface Area: ${surfaceArea.toFixed(4)}`);
          }

          const isValid = this.pyramidService.isValidPyramid(shape);
          logger.info(`  Is valid pyramid: ${isValid}`);

          if (isValid) {
            const basePlane = this.pyramidService.baseLiesOnCoordinatePlane(shape);
            logger.info(`  Base lies on coordinate plane: ${basePlane !== null ? basePlane : 'none'}`);

            const sliceDistance = 2;
            const ratio = this.pyramidService.calculateVolumeRatioAfterSlicing(shape, 'xy', sliceDistance);
            logger.info(`  Volume ratio after slicing at z=${sliceDistance}: ${ratio.toFixed(4)}`);
          }
        } catch (error) {
          logger.error(`Error processing pyramid ${shape.id}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

      logger.info(`\nTotal pyramids processed: ${pyramids.length}`);
    } catch (error) {
      logger.error(`Error in pyramid processing: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

const app = new Application();
app.run();
