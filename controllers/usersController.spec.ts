import request from 'supertest';
import express from 'express';
import { usersController } from './usersController';

const app = express();
app.use(express.json());
app.use('/users', usersController);

describe('usersController', () => {
  it('should respond with "List of users" on GET /', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.text).toBe('List of users');
  });

  it('should respond with "User {name} with email {email} created" on POST /', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'johndoe@example.com' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('User John Doe with email johndoe@example.com created');
  });

  it('should respond with "User {id} updated with name {name} and email {email}" on PUT /{id}', async () => {
    const response = await request(app)
      .put('/users/123')
      .send({ name: 'John Doe', email: 'johndoe@example.com' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('User 123 updated with name John Doe and email johndoe@example.com');
  });

  it('should respond with "User {id} deleted" on DELETE /{id}', async () => {
    const response = await request(app).delete('/users/123');
    expect(response.status).toBe(200);
    expect(response.text).toBe('User 123 deleted');
  });
});
