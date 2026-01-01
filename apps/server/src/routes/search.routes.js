import { Router } from 'express';
import { search } from '../retrieval/search.js';

export const searchRouter = Router();

searchRouter.post('/search', async (req, res) => {
  console.log('Search request received');
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    console.log('Performing search for query:', query);
    const data = await search(query);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});