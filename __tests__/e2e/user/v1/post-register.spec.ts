import { Server } from 'http';
import supertest from 'supertest';

import app from '../../../../src/app';
import { saasSubscriptionModels } from '../../../../src/container';
import { sequelize } from '../../../../src/loader';

describe('POST /member/v1/phone-register', () => {
  let request: supertest.SuperTest<supertest.Test>;
  let server: Server;

  beforeAll(done => {
    if (
      process.env.NODE_ENV === 'jest' &&
      process.env.DB_DATABASE === 'SaasSubscription'
    ) {
      // WARINING: force sync database
      console.log('start syncing database');
      saasSubscriptionModels.sync({ force: true }, async () => {
        server = app.listen(3000, () => {
          request = supertest(server);
          done();
        });
      });
    }
  });

  afterAll(done => {
    server.close(async () => {
      await sequelize.close();
      done();
    });
  });

  it('expect status 200', done => {
    request
      .post('/user/v1/register')
      .send({
        email: 'cwyu57@gmail.com',
        name: 'cwyu57',
        password: 'abc',
      })
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({
          data: {
            user: {
              email: 'cwyu57@gmail.com',
              name: 'cwyu57',
            },
          },
        });
        expect(response.body.data).toHaveProperty('accessToken');
        expect(response.body.data).toHaveProperty('refreshToken');
        expect(response.body.data.user).toHaveProperty('id');
        expect(response.body.data.user).toHaveProperty('email');
        expect(response.body.data.user).toHaveProperty('name');
        done();
      })
      .catch(err => done(err));
  });
});
