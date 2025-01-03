import express from 'express';
import type { Request, Response } from 'express';
import db from './src/config/db-registration.js';

//@TODO, Should this be in the config file ?
//@TODO: Finish DB registration. Is there a way to serve db endpoint from db file.
//@TODO: begin to implement swagger configuration.
import * as dotenv from 'dotenv';


dotenv.config();
const app = express();


// Test database connection
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err: Error) => {
        console.error('Unable to connect to the database:', err);
    });

// Sync models with the database 
db.sequelize.sync({ alter: true }) // or { force: true } to drop and recreate tables
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch((err: Error) => {
        console.error('Error synchronizing the database:', err);
    });


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, ESM world!');
});

// Database status endpoint
app.get('/db-status', async (req: Request, res: Response) => {
  try {
      await db.sequelize.authenticate();
      res.status(200).json({ status: 'Database is connected' });
  } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ status: 'Database connection failed', error: (error as Error).message });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
