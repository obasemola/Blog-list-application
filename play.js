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

  const 
}

mostLikes()
// const fetchResults = [ {
//   date: '03/20/2020', symbol: 'TLTE', quantity: 100, amount: 3570,
// }, {
//   date: '03/20/2020', symbol: 'GE', quantity: 100, amount: 10000,
// }, {
//   date: '03/20/2020', symbol: 'AAPL', quantity: 50, amount: 22222,
// }, {
//   date: '03/20/2020', symbol: 'TLTE', quantity: 4, amount: 161.02,
// }, {
//   date: '03/20/2020', symbol: 'TLTE', quantity: 281, amount: 10034.51,
// }, {
//   date: '03/21/2020', symbol: 'TLTE', quantity: 200, amount: 8000,
// } ]


// const results = Object.values(
//   // we are going to take our array and create a lookup object using reduce
//   fetchResults.reduce((obj, data) => {
//     // generate the key for our lookup object
//     const key = data.symbol + data.date
//     // check to see if the result exists yet
//     const dayResult = obj[key]
//     // if it exists we updated the record values
//     if (dayResult) {
//       dayResult.quantity += data.quantity
//       dayResult.amount += data.amount    
//     } else {
//       // if it does not exist we copy the record into the  key we made
//       obj[key] = { ...data }
//     }
//     // return our lookup data
//     return obj
//   }, {})
// )

// console.log(results)

