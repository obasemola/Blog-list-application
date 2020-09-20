const _ = require('lodash');

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

const mostBlogs = () => {
  let blogsAuthors = blogs.map(blog => blog.author);
  let reducedBlogsAuthors= _.reduce(blogsAuthors, (total, next) => {
  total[next] = (total[next] || 0) + 1;

  return total
}, {});
  const highestBlogsAuthor = Object.keys(reducedBlogsAuthors).reduce((a, b) => {
    return reducedBlogsAuthors[a] > reducedBlogsAuthors[b] ? a : b
  })

  highestBlogNumberObject = {
    author: highestBlogsAuthor,
    blogs: reducedBlogsAuthors[highestBlogsAuthor]
  }

  return highestBlogNumberObject
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}