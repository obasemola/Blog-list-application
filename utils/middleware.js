const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method', method)
  logger.info('Path', path)
  logger.info('Body', Body)
  logger.info('____')
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
}

module.exports = {
  requestLogger,
  errorHandler
}