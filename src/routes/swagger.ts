import express from 'express';
import expressBasicAuth from 'express-basic-auth';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { config } from '../config';

const swaggerDocument = yaml.load('./swagger.yaml');

const router = express.Router();

router.use(
  '/swagger/api-docs',
  expressBasicAuth({
    users: {
      [config.swaggerUsername]: config.swaggerPassword,
    },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

export default router;
