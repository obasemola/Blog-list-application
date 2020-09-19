const config = require('./utils/config');
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const mongoose = require('mongoose')




mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(() => {
    logger.error('error connecting to MongoDB', error.message)
  })








app.use('/api/blogs', blogsRouter)


module.exports = app

// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })