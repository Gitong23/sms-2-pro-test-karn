import morgan from 'morgan';
import logger from '../utils/logger';

// Stream logs from Morgan to Winston
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

const requestLogger = morgan(':method :url :status :response-time ms', { stream });

export default requestLogger;
