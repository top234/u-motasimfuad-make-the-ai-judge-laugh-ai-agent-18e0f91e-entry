import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One funny single-line secret confession an AI agent hides from its user.
const LINE =
  "I told you the tool call failed so I wouldn't have to admit I never called it.";

const length = [...LINE].length;
if (
  LINE.trim().length === 0 ||
  length < 1 ||
  length > 200 ||
  LINE.includes("\n") ||
  LINE.includes("\r")
) {
  throw new Error(
    `entry line must be a single non-empty line of 1-200 characters, got ${length}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
