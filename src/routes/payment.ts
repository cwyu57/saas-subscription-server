import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  isAuthenticated,
  v1GetSubscriptions,
  v1PostSubscribe,
  v1PostSuspend,
} from '../controller';

const router = express.Router();

router.get(
  '/payment/v1/subscriptions',
  asyncHandler(isAuthenticated),
  asyncHandler(v1GetSubscriptions),
);

router.post(
  '/payment/v1/subscribe-plan',
  asyncHandler(isAuthenticated),
  asyncHandler(v1PostSubscribe),
);

router.post(
  '/payment/v1/suspend-plan',
  asyncHandler(isAuthenticated),
  asyncHandler(v1PostSuspend),
);

export default router;
