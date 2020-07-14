const request = require('supertest');
const app = require('../../config/server');

describe('Testing routes/main.js', () => {
  test('Should test if the app is up and running', async () => {
    const res = await request(app).get('/api');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('The application is up and running!!');
  })
})