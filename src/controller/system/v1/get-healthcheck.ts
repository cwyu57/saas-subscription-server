import express from 'express';

const handler: express.Handler = async (req, res, next) => {
  res.status(200).json({ status: 'OK' });
};

export default handler;
