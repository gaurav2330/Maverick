import { Router } from "express";
import { search } from "../retrieval/search.js";
import { generateAnswer } from "../answering/answer.js";

export const answerRouter = Router();

answerRouter.post("/ask", async (req, res) => {
  console.log("Answer request received");
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    console.log("Generating answer for question:", question);
    const chunks = await search(question, 3);
    const answer = await generateAnswer({ question, chunks });

    res.json({
      answer,
      sources: chunks.map((c, i) => ({
        source: `Source ${i + 1}`,
        path: c.path,
        startLine: c.startLine,
        endLine: c.endLine,
        score: c.score
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
