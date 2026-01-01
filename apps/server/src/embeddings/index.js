import fs from 'fs';
import path from 'path';
import { embedTexts } from './ollama.js';

const EMBEDDINGS_FILE = path.resolve("../../data/embeddings.json");

export async function embedChunks(chunks) {
  const texts = chunks.slice(0, 10).map(chunk => chunk.content);

  console.log(`Embedding ${texts.length} chunks...`);
  const vectors = await embedTexts(texts);
  console.log(`Vectors: ${vectors}`);

  const embeddings = chunks.map((chunk, idx) => ({
    chunkId: chunk.id,
    vector: vectors[idx],
  }));

  const existing = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8') || '[]');

  fs.writeFileSync(
    EMBEDDINGS_FILE,
    JSON.stringify([...existing, ...embeddings], null, 2)
  );

  return embeddings.length;
}