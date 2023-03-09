import express from 'express';

export const usersController = express.Router();

usersController.get('/', (req, res) => {
  res.send('List of users');
});

usersController.post('/', (req, res) => {
  const { name, email } = req.body;
  res.send(`User ${name} with email ${email} created`);
});

usersController.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.send(`User ${id} updated with name ${name} and email ${email}`);
});

usersController.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User ${id} deleted`);
});
