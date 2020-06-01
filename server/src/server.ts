import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  return response.json({ ok: true });
});

app.listen(3333, () => console.log('Server is running on port 3333'));
