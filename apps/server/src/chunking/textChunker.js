import crypto from 'crypto';

export function chunkText({ content, documentId, path }) {
  const CHUNK_SIZE = 500; // Define the size of each chunk
  const chunks = [];

  let start = 0;
  let index = 0;

  while (start < content.length) {
    const slice = content.slice(start, start + CHUNK_SIZE);

    chunks.push({
      id: crypto.randomUUID(),
      documentId,
      path,
      index,
      content: slice,
      type: 'text'
    });
    start += CHUNK_SIZE;
    index += 1;
  }
  
  return chunks;
}