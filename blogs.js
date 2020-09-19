const express = require('express');
const Blog = require('./models/blog');
const app = express();
const config = require('./utils/config');
const logger = require('./utils/logger')
// const http = require('http')
// const cors = require('cors')


// app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})