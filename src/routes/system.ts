import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  v1GetHealthcheck,
  systemApiKeyMiddleware,
  v1GetConfig,
} from '../controller';

const router = express.Router();

router.get(
  '/system/v1/healthcheck',
  asyncHandler(systemApiKeyMiddleware),
  asyncHandler(v1GetHealthcheck),
);

router.get(
  '/system/v1/config',
  asyncHandler(systemApiKeyMiddleware),
  asyncHandler(v1GetConfig),
);

export default router;
