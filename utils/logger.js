import * as winston from 'winston'

const { createLogger, transports, format } = winston

const {
  timestamp: timestampFn,
  combine,
  printf,
  colorize,
  prettyPrint,
} = format

var options = {
  file: {
    level: 'info',
    filename: `./app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

const myFormat = printf(
  ({ level, message, timestamp }) => `${timestamp}: ${level}----> ${message} `
)

const logger = createLogger({
  format: combine(colorize(), timestampFn(), prettyPrint(), myFormat),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
})

winston.addColors({
  info: 'green',
  error: 'red',
})
logger.on('error', (err) => console.error(err.message))

logger.stream = {
  write: function (message, encoding) {
    logger.info(message)
  },
}

console.log('xx')

export default logger

// module.exports = logger
