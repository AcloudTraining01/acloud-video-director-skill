#!/usr/bin/env node
import { readVideoProjectSpec } from "../skills/acloud-video-director/scripts/validate-project-spec.mjs";

const path = process.argv[2];
if (!path) {
  console.error("Usage: npm run validate -- <video-project.json>");
  process.exit(2);
}

try {
  readVideoProjectSpec(path);
  console.log(`${path}: valid VideoProjectSpec`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
