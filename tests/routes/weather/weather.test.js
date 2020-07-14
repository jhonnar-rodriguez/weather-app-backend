const request = require('supertest');
const app = require('../../../config/server');

describe('Testing routes/weather/weather.js', () => {

  test('should return the UnAhutorizedRequest message because it does not have the authorization header', async () => {
    const res = await request(app)
      .post('/api/weather')
      .send({
        city: 'London',
        metric: 'metric',
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toEqual('Unauthorized request!!');
  });


  test('should fetch the weather by the given London City', async () => {
    const res = await request(app)
      .post('/api/weather')
      .set('Authorization', process.env.TOKEN)
      .send({
        city: 'London',
        metric: 'metric',
      });

    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body.success).toBe(true);
  });

  test('should return an empty object because the city does not exists', async () => {
    const res = await request(app)
      .post('/api/weather')
      .set('Authorization', process.env.TOKEN)
      .send({
        city: 'Not Found City',
        metric: 'metric',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Object.keys(res.body.data).length).toBe(0);
  });

});
