import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemaUrl = new URL("../schemas/video-project-spec.schema.json", import.meta.url);
const schema = JSON.parse(fs.readFileSync(schemaUrl, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateShape = ajv.compile(schema);

export function validateProjectSpec(value) {
  const validShape = validateShape(value);
  const errors = validShape ? [] : validateShape.errors.map(error => ({
    path: error.instancePath || "/",
    message: error.message || "Schema validation failed",
    keyword: error.keyword,
  }));

  if (!validShape) return { valid: false, errors };

  const orders = value.creative.scenes.map(scene => scene.order);
  if (new Set(orders).size !== orders.length) {
    errors.push({ path: "/creative/scenes", message: "Scene order values must be unique", keyword: "uniqueSceneOrder" });
  }

  const duration = value.creative.scenes.reduce((sum, scene) => sum + scene.durationSeconds, 0);
  const tolerance = Math.max(2, value.brief.targetDurationSeconds * 0.1);
  if (Math.abs(duration - value.brief.targetDurationSeconds) > tolerance) {
    errors.push({ path: "/brief/targetDurationSeconds", message: "Scene duration total must be within 10% of the target", keyword: "durationTolerance" });
  }

  if (value.budget.estimatedMicroUsd > value.budget.maxMicroUsd) {
    errors.push({ path: "/budget/estimatedMicroUsd", message: "Estimated cost exceeds the project cap", keyword: "budgetCap" });
  }

  if (value.workflow.completedStages.includes(value.workflow.currentStage)) {
    errors.push({ path: "/workflow/currentStage", message: "Current stage cannot also be completed", keyword: "stageState" });
  }

  return { valid: errors.length === 0, errors };
}

export function assertVideoProjectSpec(value) {
  const result = validateProjectSpec(value);
  if (!result.valid) {
    const message = result.errors.map(error => `${error.path}: ${error.message}`).join("\n");
    throw new Error(`Invalid VideoProjectSpec:\n${message}`);
  }
  return value;
}

export function readVideoProjectSpec(path) {
  return assertVideoProjectSpec(JSON.parse(fs.readFileSync(path, "utf8")));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const path = process.argv[2];
  if (!path) {
    console.error("Usage: node validate-project-spec.mjs <video-project.json>");
    process.exit(2);
  }
  try {
    readVideoProjectSpec(path);
    console.log(`${path}: valid VideoProjectSpec`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
