import express from 'express';
import asyncHandler from 'express-async-handler';

import { v1GetHealthcheck } from '../controller';

const router = express.Router();

router.get('/system/v1/healthcheck', asyncHandler(v1GetHealthcheck));

export default router;
