import { PrismaClient } from '@prisma/client';
import logger from './logger';

const database = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
});

database.$on('query', (e) => {
  logger.info(`Query: ${e.query} ${e.params}, ${e.duration}ms`);
});

database.$on('info', (e) => {
  logger.info(`Info: ${e.message}`);
});

database.$on('warn', (e) => {
  logger.warn(`Warn: ${e.message}`);
});

database.$on('error', (e) => {
  logger.error(`Error: ${e.message}`);
});

export default database;
