import express from 'express';
import 'dotenv/config';
import { healthRouter } from './routes/health.routes.js';
import { ingestRouter } from './routes/ingest.routes.js';
import { searchRouter } from './routes/search.routes.js';
import { answerRouter } from './routes/answer.routes.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4545;

app.use(healthRouter);
app.use(ingestRouter);
app.use(searchRouter);
app.use(answerRouter);

app.listen(PORT, () => {
  console.log(`Maverick Server is running on http://localhost:${PORT}`);
});