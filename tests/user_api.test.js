const { TestScheduler } = require('jest');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app')

const api = supertest(app);

describe('checking of validation works', async () => {
  test('of whether short username returns bad request', async () => {
    const results = await api.get('/api/users');

    const newUser = {
      username: 'ga',
      name: 'sebastian',
      password: 'bose'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newResponse = await api.get('/api/users')

    expect(response.body.error).toBe('length of username or password is less than 3')
    expect(newResponse.body).toHaveLength(results.body.length)

  });

  test('whether short password returns bad request', async() => {
    const results = await api.get('/api/users')

    const newUser = {
      username: 'battle',
      name: 'sebastian',
      password: 'bo'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newResponse = await api.get('/api/users')

    expect(response.body.error).toBe('length of username or password is less than 3')
    expect(newResponse.body).toHaveLength(results.body.length)
  });

  test('whether non-uniques usernames return bad request', async () => {
    const results = await api.get('/api/users')

    const newUser = {
      username: 'guy sebasti',
      name: 'sebastian',
      password: 'bo'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const newResponse = await api.get('/api/users')

    expect(newResponse.body).toHaveLength(results.body.length)
  })
    
  })