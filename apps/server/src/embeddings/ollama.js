export async function embedTexts(texts) {
  const embeddings = [];

  for (const text of texts) {
    const res = await fetch('http://localhost:11434/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: text,
      }),
    });

    const data = await res.json();
    embeddings.push(data.embedding);
  }

  return embeddings;
}