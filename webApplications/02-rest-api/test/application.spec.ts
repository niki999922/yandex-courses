/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest';

import app from '../src/app';
import db from '../src/dataBase/initDB';

const request = supertest(app);

const cleanDb = async () => {
  const tableNames = Object.keys(db.sequelize.models);
  await db.sequelize.query(`TRUNCATE ${tableNames.map(name => `"${name}"`).join(', ')} CASCADE;`);
};

describe('API', () => {
  beforeAll(async () => {
    // Здесь создаются все таблицы по моделям
    await db.sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await request.delete('/locations');
  });

  it('Должно вернуть список мест', async () => {
    const res = await request.get('/locations');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('Должно создать место', async () => {
    const resPost = await request.post('/locations').send({
      name: 'test name 1',
      description: 'test description 1'
    });

    const resGet = await request.get('/locations');
    const expectedPartResponse = {
      name: 'test name 1',
      description: 'test description 1',
      isVisited: false
    };

    expect(resPost.status).toBe(204);
    expect(resGet.body[0]).toMatchObject(expectedPartResponse);
  });

  it('Должно вернуть место по id', async () => {
    await request.post('/locations').send({
      name: 'test name by id 2',
      description: 'test description by id 2'
    });

    const resGet = await request.get('/locations/2');
    const expectedPartResponse = {
      name: 'test name by id 2',
      description: 'test description by id 2',
      isVisited: false
    };

    expect(resGet.status).toBe(200);
    expect(resGet.body).toMatchObject(expectedPartResponse);
  });

  it('Должно удалить место по id', async () => {
    await request.post('/locations').send({
      name: 'test name by id 3',
      description: 'test description by id 3'
    });
    const resDelete = await request.delete('/locations/1');
    const resGetAfter = await request.get('/locations/1');

    expect(resDelete.status).toBe(204);
    expect(resGetAfter.status).toBe(404);
  });

  // Можете сами дописать больше тестов
});
