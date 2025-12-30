import { Router } from 'express';
import { ingestPath } from '../ingest/index.js';

export const ingestRouter = Router();

ingestRouter.post('/ingest', (req, res) => {
  console.log('Ingest request received');
  const { path } = req.body;

  if (!path) {
    return res.status(400).json({ error: 'Path is required' });
  }

  try {
    const result = ingestPath(path);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});