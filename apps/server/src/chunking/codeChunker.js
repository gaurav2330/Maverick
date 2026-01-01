export function chunkCode ({ content, documentId, path }) {
  const lines = content.split('\n');
  const chunks = [];

  const LINES_PER_CHUNK = 40;
  let index = 0;
  console.log("chunking code content", lines.length);

  for (let i = 0; i < lines.length; i += LINES_PER_CHUNK) {
    const slice = lines.slice(i, i + LINES_PER_CHUNK).join('\n');

    chunks.push({
      id: crypto.randomUUID(),
      documentId,
      path,
      index,
      content: slice,
      startLine: i + 1,
      endLine: Math.min(i + LINES_PER_CHUNK, lines.length),
      type: 'code'
    });
    index += 1;
  }

  return chunks;
}