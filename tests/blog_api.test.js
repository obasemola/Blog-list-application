const { get } = require('lodash')
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
  expect(response.body).toHaveLength(5)
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
})

afterAll(() => {
  mongoose.connection.close()
})