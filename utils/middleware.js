const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.ody)
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