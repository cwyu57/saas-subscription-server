import { Sequelize } from 'sequelize';
import { config } from '../config';

export default new Sequelize({
  host: config.databaseHost,
  username: config.databaseUserName,
  password: config.databasePassword,
  database: config.databaseDatabase,
  port: config.databasePort,
  dialect: 'mysql',
  logQueryParameters: true,
  pool: {
    max: config.databaseMaxConnection,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
    ],
    max: config.databaseMaxRetry,
  },
});
