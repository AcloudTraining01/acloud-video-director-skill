import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemaUrl = new URL("../schemas/video-project-spec.schema.json", import.meta.url);
const schema = JSON.parse(fs.readFileSync(schemaUrl, "utf8"));
const routeCatalogUrl = new URL("../schemas/video-format-routes.json", import.meta.url);
const routeCatalog = JSON.parse(fs.readFileSync(routeCatalogUrl, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateShape = ajv.compile(schema);

function validateRouteAnswers(routeId, answers) {
  const route = routeCatalog.routes.find(item => item.id === routeId);
  if (!route) return [{ path: "/identity/route", message: "Route is missing from the format catalog", keyword: "routeCatalog" }];
  const questions = route.questions;
  const allowed = new Set(questions.map(question => question.id));
  const errors = [];
  for (const key of Object.keys(answers)) if (!allowed.has(key)) errors.push({ path: `/routePlan/answers/${key}`, message: "Answer does not belong to the selected route", keyword: "routeAnswers" });
  for (const question of questions) {
    const value = answers[question.id];
    const unanswered = value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
    if (question.required && unanswered) { errors.push({ path: `/routePlan/answers/${question.id}`, message: "Answer is required", keyword: "routeAnswers" }); continue; }
    if (unanswered) continue;
    if (question.input === "number") {
      if (typeof value !== "number" || !Number.isFinite(value)) errors.push({ path: `/routePlan/answers/${question.id}`, message: "Answer must be a number", keyword: "routeAnswers" });
      else if (value < question.min || value > question.max) errors.push({ path: `/routePlan/answers/${question.id}`, message: `Answer must be between ${question.min} and ${question.max}`, keyword: "routeAnswers" });
    } else if (question.input === "boolean") {
      if (typeof value !== "boolean") errors.push({ path: `/routePlan/answers/${question.id}`, message: "Answer must be yes or no", keyword: "routeAnswers" });
    } else if (question.input === "multi_choice") {
      const options = new Set(question.options.map(option => option.value));
      if (!Array.isArray(value) || value.some(item => typeof item !== "string" || !options.has(item))) errors.push({ path: `/routePlan/answers/${question.id}`, message: "Choose one or more listed options", keyword: "routeAnswers" });
    } else if (question.input === "single_choice") {
      if (typeof value !== "string" || !question.options.some(option => option.value === value)) errors.push({ path: `/routePlan/answers/${question.id}`, message: "Choose one listed option", keyword: "routeAnswers" });
    } else if (typeof value !== "string") errors.push({ path: `/routePlan/answers/${question.id}`, message: "Answer must be text", keyword: "routeAnswers" });
  }
  return errors;
}

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

  errors.push(...validateRouteAnswers(value.identity.route, value.routePlan.answers));
  const route = routeCatalog.routes.find(item => item.id === value.identity.route);
  if (route && (value.brief.targetDurationSeconds < route.duration.minSeconds || value.brief.targetDurationSeconds > route.duration.maxSeconds)) {
    errors.push({ path: "/brief/targetDurationSeconds", message: `Target duration must be between ${route.duration.minSeconds} and ${route.duration.maxSeconds} seconds for ${route.name}`, keyword: "routeDuration" });
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
