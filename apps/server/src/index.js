import express from 'express';
import { healthRouter } from './routes/health.routes.js';
import { ingestRouter } from './routes/ingest.routes.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4545;

app.use(healthRouter);
app.use(ingestRouter);

app.listen(PORT, () => {
  console.log(`Maverick Server is running on http://localhost:${PORT}`);
});