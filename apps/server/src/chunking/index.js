import fs from 'fs';
import path from 'path';
import { chunkText } from './textChunker.js';
import { chunkCode } from './codeChunker.js';

const CHUNKS_FILE = path.resolve("../../data/chunks.json");
const CODE_EXTENSIONS = new Set(['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.c', '.cpp', '.rb', '.go']);

export function chunkDocument(doc) {
  const content = fs.readFileSync(doc.path, 'utf-8');
  
  if (doc.extension && CODE_EXTENSIONS.has(doc.extension)) {
    console.log("in here", doc.extension);
    return chunkCode({
      content,
      documentId: doc.id,
      path: doc.path
    });
  }


  return chunkText({
    content,
    documentId: doc.id,
    path: doc.path
  });
}

export function saveChunks(newChunks) {
  const existing = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf-8') || '[]');

  fs.writeFileSync(
    CHUNKS_FILE,
    JSON.stringify([...existing, ...newChunks], null, 2)
  )
}