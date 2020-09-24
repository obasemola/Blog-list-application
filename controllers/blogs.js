const blogsRouter = require('express').Router();
const Blog = require('../models/blog');



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const handleLikes = () => {
    if(blog.likes){
      return blog.likes
    } else {
      return blog.likes = 0
    }
  }

  handleLikes()
  
  const result = await blog.save()
  response.status(201).json(result)
})


module.exports = blogsRouter