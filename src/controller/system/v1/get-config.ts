import express from 'express';
import { config } from '../../../config';

export const v1GetConfig: express.Handler = async (req, res) => {
  res.status(200).json({ data: config });
};
