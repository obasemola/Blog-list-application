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
})

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs');
  const ids = response.body.map(res => res.id);

  expect(ids).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})