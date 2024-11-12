const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

// Custom format function
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level.padEnd(7)}: ${message}`; // Pad level for alignment
});

// Create a Winston logger with enhanced format
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'myApp' }),  // Custom label for the application or module name
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Custom timestamp format
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
