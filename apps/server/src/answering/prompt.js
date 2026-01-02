export function buildPrompt({ question, chunks }) {
  const context = chunks.map((c, i) => {
    const location = c.startLine ? `${c.path}:${c.startLine}-${c.endLine}` : c.path;

    return `
    [Source ${i + 1}]
    File: ${location}
    Content:
    ${c.content}
    `;
  }).join("\n");


  return `
    You are Maverick, a grounded local assisstant.

    RULES:
    - Answer only using the provided context.
    - If the answer is not in the context, respond with "I don't know".
    - Cite sources using [Source X] notation.
    - Do not hallucinate or fabricate information.

    SOURCES:
    ${context}

    QUESTION:
    ${question}

    ANSWER:
  `;
}
