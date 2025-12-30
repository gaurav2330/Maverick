import fs from 'fs';
import path from 'path';

const SUPPORTED_EXTENSIONS = ['.js', '.md', '.txt', '.json'];
const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".cache",
  "coverage"
]);

const IGNORED_FILES = new Set([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml"
]);


export function walkDirectory(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRECTORIES.has(entry.name) || IGNORED_FILES.has(entry.name)) {
      continue;
    }
    const fullPath = path.resolve(dir, entry.name);

    if (entry.isDirectory()) {
      walkDirectory(fullPath, results);
    } else {
      const ext = path.extname(entry.name);
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        results.push({
          path: fullPath,
          extension: ext,
          size: fs.statSync(fullPath).size
        });
      }
    } 
  }

  return results;
}