import { Sequelize } from 'sequelize';

const db = {
  sequelize: new Sequelize('itmo', 'admin', 'admin', {
    host: 'postgres',
    dialect: 'postgres'
  })
};

export default db;
