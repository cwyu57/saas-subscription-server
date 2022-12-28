import express from 'express';

export const v1GetHealthcheck: express.Handler = async (req, res) => {
  res.status(200).json({ status: 'OK' });
};
