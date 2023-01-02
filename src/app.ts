import express from 'express';
import { errorHandler } from './controller';
import { swaggerRouter, systemRouter } from './routes';

const app = express();

app.use(swaggerRouter);
app.use(systemRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);

export default app;
