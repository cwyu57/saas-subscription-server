import express from 'express';
import asyncHandler from 'express-async-handler';

import { v1PostRegister } from '../controller';

const router = express.Router();

router.post('/user/v1/register', asyncHandler(v1PostRegister));

export default router;
