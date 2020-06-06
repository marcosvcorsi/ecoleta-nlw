import 'reflect-metadata';

import './database';

import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();
app.use(cors());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Server is running on port 3333'));