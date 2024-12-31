
interface PoolConfig {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  }
  
  interface SSLConfig {
    require: boolean;
    rejectUnauthorized: boolean;
    ca?: string;
  }
  
  interface DBConfig {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
    pool: PoolConfig;
    dialect: string;
    dialectOptions: {
      ssl: SSLConfig;
    };
  }
  
  const dbConfig =  (): DBConfig => {
    const environment = process.env.NODE_ENV || 'production';
  
    const sslOptions: SSLConfig = {
      require: true,
      rejectUnauthorized: environment === 'production'
    };
  
    const dbPassword = process.env.DB_PASSWORD || 'password';
    //console.log('this is the db password from dbconfig: ' + dbPassword);
  
    return {
      database: 'grid_be_db',
      user:  'addlatt',
      password: dbPassword,
      host:  'localhost',
      port: 5432,
      pool: {
        max:  5,
        min: 0,
        acquire:  30000,
        idle:  10000,
      },
      dialect: 'postgres',
      dialectOptions: {
        ssl: sslOptions,
      },
    };
  };
  
  export default dbConfig;