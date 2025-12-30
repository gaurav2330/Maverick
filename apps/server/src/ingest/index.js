import fs from "fs";
import path from "path";
import crypto from "crypto";
import { walkDirectory } from "./walker.js";

const DATA_FILE = path.resolve("../../data/documents.json");

export function ingestPath(targetPath) {
  const files = walkDirectory(targetPath);

  const existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8") || "[]");

  const newDocs = files.map((file) => ({
    id: crypto.randomUUID(),
    path: file.path,
    extension: file.extension,
    size: file.size,
    ingestedAt: new Date().toISOString(),
  }));
  
  const allDocs = existing.concat(newDocs);
  fs.writeFileSync(DATA_FILE, JSON.stringify(allDocs, null, 2));

  return { added: newDocs.length };
}