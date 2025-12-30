import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (_, res) => {
  console.log('Health check requested');
  res.json({
    service: 'maverick',
    status: 'ok',
    uptime: process.uptime()
  })
});