const _ = require('lodash');

const blogs = [ 
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },

  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  
  { _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12,
  __v: 0 },
  
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
  
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
  
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]


// let words = ['sky', 'forest', 'wood', 'sky', 'rock', 'cloud', 
//     'sky', 'forest', 'rock', 'sky'];

// let tally = _.reduce(words, (total, next) => {

//   total[next] = (total[next] || 0) + 1 ;

//   return total;
// }, {});


// console.log(tally);

const mostLikes = () => {
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
  
  const result = reducedLikes.map((reducedLike) => {
    if(reducedLike.likes === max) {
      return reducedLike
    } else {
      return
    }
  })
  return result
}

mostLikes()