import path from 'path';
import request from 'supertest';

import { Connection, getConnection, getRepository } from 'typeorm';
import createConnection from '../../src/database';

import Point from '../../src/entities/Point';

import app from '../../src/app';

let connection: Connection;

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS point_items');
    await connection.query('DROP TABLE IF EXISTS items');
    await connection.query('DROP TABLE IF EXISTS points');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM point_items');
    await connection.query('DELETE FROM points');
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should be able to return all items', async () => {
    const response = await request(app).get('/items');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(6);
  });

  it('should be able to create a point', async () => {
    const image = path.resolve(__dirname, 'test.jpg');

    const response = await request(app)
      .post('/points')
      .attach('image', image)
      .field('name', 'Test Point')
      .field('email', 'tp@ecoleta.com.br')
      .field('whatsapp', '5546999554433')
      .field('latitude', -26.0755733)
      .field('longitude', -53.0647391)
      .field('city', 'Francisco Beltrão')
      .field('uf', 'PR')
      .field('items', '1,2,3');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to find a point by id', async () => {
    const image = path.resolve(__dirname, 'test.jpg');

    const { body: point } = await request(app)
      .post('/points')
      .attach('image', image)
      .field('name', 'Test Point')
      .field('email', 'tp@ecoleta.com.br')
      .field('whatsapp', '5546999554433')
      .field('latitude', -26.0755733)
      .field('longitude', -53.0647391)
      .field('city', 'Francisco Beltrão')
      .field('uf', 'PR')
      .field('items', '1,2,3');

    const response = await request(app).get(`/points/${point.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('point');
    expect(response.body).toHaveProperty('items');
  });

  it('should not be able to find a point by id when id does not exists', async () => {
    const response = await request(app).get(`/points/99999`);

    expect(response.status).toBe(400);
  });

  it('should be able to filter all points by params', async () => {
    const pointsRepository = getRepository(Point);

    await pointsRepository.save(
      pointsRepository.create({
        name: 'Test',
        email: 'test@test.com',
        whatsapp: '45646545456',
        latitude: Number(10),
        longitude: Number(20),
        city: 'Teste City',
        uf: 'UF',
        image: 'test.jpg',
        pointItems: [{ item_id: 1 }, { item_id: 2 }, { item_id: 3 }],
      })
    );

    await pointsRepository.save(
      pointsRepository.create({
        name: 'Test',
        email: 'test@test.com',
        whatsapp: '45646545456',
        latitude: Number(10),
        longitude: Number(20),
        city: 'Teste City 2',
        uf: 'FF',
        image: 'test.jpg',
        pointItems: [{ item_id: 1 }, { item_id: 2 }, { item_id: 3 }],
      })
    );

    await pointsRepository.save(
      pointsRepository.create({
        name: 'Test',
        email: 'test@test.com',
        whatsapp: '45646545456',
        latitude: Number(10),
        longitude: Number(20),
        city: 'Teste City',
        uf: 'UF',
        image: 'test.jpg',
        pointItems: [{ item_id: 4 }, { item_id: 5 }, { item_id: 6 }],
      })
    );

    const response = await request(app)
      .get('/points')
      .query({
        city: 'Teste City',
        uf: 'UF',
        items: [1, 2, 3],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
