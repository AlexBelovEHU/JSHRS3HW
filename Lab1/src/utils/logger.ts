import pino from 'pino';
import { createWriteStream } from 'fs';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const projectRoot = join(currentDir, '..', '..');
const logsDir = join(projectRoot, 'logs');
const logFilePath = join(logsDir, 'app.log');

try {
  mkdirSync(logsDir, { recursive: true });
} catch (error) {
}

const logStream = createWriteStream(logFilePath, { flags: 'a' });

export const logger = pino(
  {
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream([
    { level: 'info', stream: process.stdout },
    { level: 'info', stream: logStream },
  ]),
);
