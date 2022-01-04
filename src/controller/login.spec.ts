jest.mock('../service/login.service');
jest.mock('sequelize-typescript');
import supertest from 'supertest';
import { app } from '../app';
// import { login } from '../service/login.service';

describe('User module', () => {
  // test('user not found or password is incorrect', async () => {
  //   const emptyUser = {
  //     username: '',
  //     password: ''
  //   };
  //   const res = await supertest(app).post('/login').send(emptyUser);
  //   expect(res.status).toEqual(400);
  // });
  test('user not found or password is correct', async () => {
    const emptyUser = {
      username: 'piers',
      password: '123456'
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // login.mockReturnValue(Promise.resolve(new Response('4')));
    const res = await supertest(app).post('/login').send(emptyUser);
    expect(res.status).toEqual(200);
  });
});
