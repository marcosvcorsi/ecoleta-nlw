import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  return response.json(['Marcos', 'Diego', 'Daniel']);
});

app.listen(3333, () => console.log('Server is running on port 3333'));
