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

const mostBlogs = (blogs) => {
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

const mostLikes = (blogs) => {
  let blogsAuthorsAndLikes = blogs.map((blog) => {
    return {
      author: blog.author,
      likes: blog.likes

    }
  });

  console.log(blogsAuthorsAndLikes)

  const reducedLikes = Object.values(
    blogsAuthorsAndLikes.reduce((obj, blog) => {
      const key = blog.author;
      const authorLikes = obj[key];

      if(authorLikes){
        authorLikes.likes += blog.likes
      } else {
        obj[key] = {...blog}
      }
      return obj
    }, {})
  )
  console.log(reducedLikes)

  const arr = reducedLikes.map((reducedLike) => {
    return reducedLike.likes
  });
  const max = Math.max(...arr);
  
  let result
  const resultArray = reducedLikes.map((reducedLike) => {
    if(reducedLike.likes === max) {
      result = reducedLike
    } else {
      return
    }
  })
  return result
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}