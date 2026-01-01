import fs from 'fs';
import path from 'path';
import { embedTexts } from '../embeddings/ollama.js';

const EMBEDDINGS_FILE = path.resolve("../../data/embeddings.json");
const CHUNKS_FILE = path.resolve("../../data/chunks.json");

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function search(query, topK = 5) {
  const [queryVector] = await embedTexts([query]);

  const embeddings = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'));
  const chunks = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf-8'));

  console.log(`Loaded ${embeddings.length} embeddings and ${chunks.length} chunks`);
  const scored = embeddings
    .filter(e => Array.isArray(e.vector))
    .map(e => {
      console.log('Computing score for embedding id:', e.chunkId);
      const chunk = chunks.find(c => c.id === e.chunkId);

      if (!chunk) {
        console.warn('No chunk found for embedding id:', e.chunkId);
        return null;
      }
      console.log('Corresponding chunk:', chunk);
      return {
        ...chunk,
        score: cosineSimilarity(queryVector, e.vector)
      };
    });

  console.log('Scored chunks:', scored);
  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}