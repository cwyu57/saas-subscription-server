import express from 'express';
import { errorHandler } from './controller';
import { systemRouter } from './routes';

const app = express();

app.use(systemRouter);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
