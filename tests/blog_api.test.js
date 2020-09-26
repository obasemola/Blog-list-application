const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes return correct format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('notes return correct number of response', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2)
});

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs');
  const ids = response.body.map(res => res.id);

  expect(ids).toBeDefined()
})

test('post requests are valid', async () => {
  const newBlog = {
    title: "99 problems",
    author: "Jayz",
    url: 'jayz.com',
    likes: 17
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(8)
});

test('if likes property defaults to 0 when missing', async() => {
  const newBlog = {
    title: "99 problems",
    author: "Jayz",
    url: 'jayz.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  
  expect(response.body[5].likes).toBe(0)
});

test('to make request throw error if title and url are missing', async () => {
  const newBlog = {
    author: "Jayz",
    likes: 10
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('deletion of a single resource', async() => {

  const response = await api.get('/api/blogs')
  const toBeDeleted = response.body[2];


  await api
    .delete(`/api/blogs/${toBeDeleted.id}`)
    .expect(204)

  const newResponse = await api.get('/api/blogs')
  const blogs = newResponse.body.map(blog => blog);

  expect(blogs).toHaveLength(response.body.length - 1);


  expect(blogs).not.toContain(toBeDeleted)

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

afterAll(() => {
  mongoose.connection.close()
})