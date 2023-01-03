import express from 'express';
import asyncHandler from 'express-async-handler';

import { isAuthenticated, v1GetProfile, v1PostRegister } from '../controller';

const router = express.Router();

router.post('/user/v1/register', asyncHandler(v1PostRegister));
router.get(
  '/user/v1/profile',
  asyncHandler(isAuthenticated),
  asyncHandler(v1GetProfile),
);

export default router;
