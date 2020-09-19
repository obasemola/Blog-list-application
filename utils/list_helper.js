const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
})

const favouriteBlog = (blogs) => {
  const arr = blogs.map(blog => blog.likes);
  const max = Math.max(...arr)
  let favBlog;

  blogs.map((blog) => {
    if(blog.likes === max) {
      favBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }

    }
    else {
      return
    }
  })
  return favBlog
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}