import express from 'express';
import { errorHandler } from './controller';
import {
  catalogRouter,
  paymentRouter,
  swaggerRouter,
  systemRouter,
  userRouter,
} from './routes';

// import { saasSubscriptionModels } from './container';

// saasSubscriptionModels.sync({ force: true }, () => {});

const app = express();

app.use(express.json());

app.use(catalogRouter);
app.use(paymentRouter);
app.use(swaggerRouter);
app.use(systemRouter);
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('Hello CakeResume!');
});

app.use(errorHandler);

export default app;
