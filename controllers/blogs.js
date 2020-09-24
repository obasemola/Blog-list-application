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

  const handleTitleAndUrl = async () => {
    if(!blog.title && !blog.url) {
      return response.status(400).json()
    } else {
      const result = await blog.save()
      return response.status(201).json(result)
    }
  }

  handleLikes()
  handleTitleAndUrl()
  
})


module.exports = blogsRouter