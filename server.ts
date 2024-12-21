import express from 'express';
import type { Request, Response } from 'express';

//@TODO, Should this be in the config file ?
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, ESM world!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
