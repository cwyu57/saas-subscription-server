import express from 'express';
import { errorHandler } from './controller';
import {
  catalogRouter,
  swaggerRouter,
  systemRouter,
  userRouter,
} from './routes';

const app = express();

app.use(express.json());

app.use(catalogRouter);
app.use(swaggerRouter);
app.use(systemRouter);
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);

export default app;
