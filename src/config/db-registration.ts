import { Sequelize } from 'sequelize';
import DBConfig from './db-config.js';
import { initUserModel } from '../models/user-model.js';
import type { UserAttributes, UserCreationAttributes } from '../models/user-model.js';

// Call the function to get the configuration object
const config = DBConfig(); 

// Create a new Sequelize instance with the configuration
interface DBConfig {
    database: string;
    user: string;
    password: string;
    host: string;
    dialectOptions?: object;
    pool?: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
}

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'postgres',
    dialectOptions: config.dialectOptions,
    pool: config.pool,
    logging: (msg: string) => console.log(`[Sequelize]: ${msg}`),
    schema: 'test',
});

const db: {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  users: import('sequelize').ModelStatic<
    import('sequelize').Model<UserAttributes, UserCreationAttributes>
  >;
} = {
  Sequelize, // Refers to Sequelize library itself
  sequelize, // Refers to an instance of the Sequelize class configured for connection to our DB
  users: initUserModel(sequelize), // Refers to the User model
};

export default db;
