import express from 'express';
import asyncHandler from 'express-async-handler';

import { v1GetPlans } from '../controller';

const router = express.Router();

router.get('/catalog/v1/plans', asyncHandler(v1GetPlans));

export default router;
