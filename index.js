const express = require('express');
const blogsRouter = require('./controllers/blogs');
const app = express()
const config = require('./utils/config');
const logger = require('./utils/logger');

app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})