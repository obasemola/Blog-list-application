const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('All requests work as they should', async() => {
  test('blogs return correct format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  
  test('updating db data', async() => {

    const response = await api.get('/api/blogs');
    const dataToUpdateID = response.body[0].id;
  
    const newData = {
      title: "kilonsele",
      author: "wizzy",
      url: "Jayz.ng",
      likes: 7
    };
  
    await api
      .put(`/api/blogs/${dataToUpdateID}`)
      .send(newData)
      .expect(200)
  
    const newResponse = await api.get('/api/blogs');
  
    expect(newResponse.body[0].likes).toBe(7)
    
  })

  test('post requests are valid', async () => {
    const newBlog = {
      title: "99 problems",
      author: "Jayz",
      url: 'jayz.com',
    };
 
  await api
    .post('/api/blogs')
    .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd5Z3JyZWVhYSIsImlkIjoiNWY3MGQyNmMxNDA4YjE0OTk4MTMxNDY1IiwiaWF0IjoxNjAxMjI5NTE0fQ.x_sS93Q3D-lrkfUOqxmG3Yzaq_rXQ9cXRgEcl5WWD8c")
    .send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    // // expect(response.body).toHaveLength(8)
  });

  test('deletion of a single resource', async() => {

    const response = await api.get('/api/blogs')
    const toBeDeleted = response.body[8].id;

   

  const result = await api
    .delete(`/api/blogs/${toBeDeleted}`)
    .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd5Z3JyZWVhYSIsImlkIjoiNWY3MGQyNmMxNDA4YjE0OTk4MTMxNDY1IiwiaWF0IjoxNjAxMjI5NTE0fQ.x_sS93Q3D-lrkfUOqxmG3Yzaq_rXQ9cXRgEcl5WWD8c")
    .expect(204)

    
    console.log(result, 'idddddddddddddddddd')

  
    const newResponse = await api.get('/api/blogs')
  
    const blogs = newResponse.body.map(blog => blog);
  

    expect(blogs).toHaveLength(response.body.length-  1); 
  
  
    expect(blogs).not.toContain(toBeDeleted)
  
  });

})


describe('blog contents work as they should', async() => {
  test('the unique identifier is named id', async () => {
    const response = await api.get('/api/blogs');
    const ids = response.body.map(res => res.id);
  
    expect(ids).toBeDefined()
  });


  test('if likes property defaults to 0 when missing', async() => {
    const newBlog = {
      title: "99 problems",
      author: "Jayz",
      url: 'jayz.com',
    };
  
    api
      .post('/api/blogs')
      .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd5Z3JyZWVhYSIsImlkIjoiNWY3MGQyNmMxNDA4YjE0OTk4MTMxNDY1IiwiaWF0IjoxNjAxMjI5NTE0fQ.x_sS93Q3D-lrkfUOqxmG3Yzaq_rXQ9cXRgEcl5WWD8c")
      .send(newBlog)
  
    const response = await api.get('/api/blogs')
    
    expect(response.body[5].likes).toBe(0)
  });

  
  test('to make request throw error if title and url are missing', async () => {
    const newBlog = {
      author: "Jayz",
      likes: 10
    };
  
    api
      .post('/api/blogs')
      .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd5Z3JyZWVhYSIsImlkIjoiNWY3MGQyNmMxNDA4YjE0OTk4MTMxNDY1IiwiaWF0IjoxNjAxMjI5NTE0fQ.x_sS93Q3D-lrkfUOqxmG3Yzaq_rXQ9cXRgEcl5WWD8c")
      .send(newBlog)
      .expect(400)
  
  });
  
  
});

afterAll(() => {
  mongoose.connection.close()
})