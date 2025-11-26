import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ShapeFactory } from '../factories/ShapeFactory.js';
import { RectangleFactory } from '../factories/RectangleFactory.js';
import { PyramidFactory } from '../factories/PyramidFactory.js';
import type { Shape } from '../entities/Shape.js';
import { logger } from './logger.js';
import { FileReadError } from '../exceptions/FileReadError.js';

export class FileReader {
  private readonly rectangleFactory: ShapeFactory;
  private readonly pyramidFactory: ShapeFactory;

  constructor() {
    this.rectangleFactory = RectangleFactory.getInstance();
    this.pyramidFactory = PyramidFactory.getInstance();
  }

  public readShapesFromFile(fileName: string, shapeType: 'rectangle' | 'pyramid'): Shape[] {
    const shapes: Shape[] = [];
    
    try {
      const currentFilePath = fileURLToPath(import.meta.url);
      const currentDir = dirname(currentFilePath);
      const projectRoot = join(currentDir, '..', '..');
      const filePath = join(projectRoot, 'data', fileName);
      
      logger.info(`Reading shapes from file: ${filePath}`);
      
      const fileContent = readFileSync(filePath, 'utf-8');
      const lines = fileContent.split('\n');
      
      let lineNumber = 0;
      for (const line of lines) {
        lineNumber += 1;
        const trimmedLine = line.trim();
        
        if (trimmedLine === '' || trimmedLine.startsWith('#')) {
          continue;
        }
        
        const data = trimmedLine.split(/\s+/);
        
        try {
          let shape: Shape | null = null;
          
          if (shapeType === 'rectangle') {
            shape = this.rectangleFactory.createShape(data);
          } else if (shapeType === 'pyramid') {
            shape = this.pyramidFactory.createShape(data);
          }
          
          if (shape !== null) {
            shapes.push(shape);
            logger.info(`Successfully created ${shapeType} from line ${lineNumber}`);
          } else {
            logger.warn(`Invalid data on line ${lineNumber}: ${trimmedLine}`);
          }
        } catch (error) {
          logger.warn(`Error processing line ${lineNumber}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      
      logger.info(`Total shapes created: ${shapes.length}`);
    } catch (error) {
      const errorMessage = `Failed to read file: ${error instanceof Error ? error.message : String(error)}`;
      logger.error(errorMessage);
      throw new FileReadError(errorMessage);
    }
    
    return shapes;
  }
}
