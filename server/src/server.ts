import 'reflect-metadata';

import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

const app = express();
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Server is running on port 3333'));
