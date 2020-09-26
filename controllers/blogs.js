const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body;
  const user = await User.findById(body.userId);


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

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
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
    }
  }

  handleLikes()
  handleTitleAndUrl()
  
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const findBlog = await Blog.findOne({ title: blog.title, author: body.author });


  if(findBlog) {
    const updatedLikes = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(updatedLikes)
  }



})


module.exports = blogsRouter