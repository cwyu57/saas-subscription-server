import express from 'express';
import { systemRouter } from './routes';

const app = express();

app.use(systemRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
