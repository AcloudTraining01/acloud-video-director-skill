import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { validateProjectSpec } from "../skills/acloud-video-director/scripts/validate-project-spec.mjs";

const exampleUrl = new URL("../skills/acloud-video-director/examples/single-scene.json", import.meta.url);
const catalogUrl = new URL("../skills/acloud-video-director/schemas/video-format-routes.json", import.meta.url);
const validSpec = () => JSON.parse(fs.readFileSync(exampleUrl, "utf8"));

test("accepts the portable single-scene example", () => {
  assert.deepEqual(validateProjectSpec(validSpec()), { valid: true, errors: [] });
});

test("defines eight complete, uniquely named format routes", () => {
  const catalog = JSON.parse(fs.readFileSync(catalogUrl, "utf8"));
  assert.equal(catalog.questionnaireVersion, 1);
  assert.equal(catalog.sharedQuestions.length, 8);
  assert.equal(catalog.routes.length, 8);
  assert.equal(new Set(catalog.routes.map(route => route.id)).size, 8);
  assert.equal(new Set(catalog.routes.map(route => route.name)).size, 8);
  for (const route of catalog.routes) {
    assert.equal(route.questions.length, 5);
    assert.equal(new Set(route.questions.map(question => question.id)).size, 5);
    assert.equal(route.duration.minSeconds <= route.duration.recommendedSeconds && route.duration.recommendedSeconds <= route.duration.maxSeconds, true);
    assert.equal(route.defaultCapabilities.includes("quality_review"), true);
    assert.equal(route.defaultCapabilities.includes("export"), true);
  }
});

test("rejects malformed project fields", () => {
  const value = validSpec();
  value.identity.route = "unknown_route";
  const result = validateProjectSpec(value);
  assert.equal(result.valid, false);
  assert.equal(result.errors.some(error => error.path === "/identity/route"), true);
});

test("rejects duplicate scene order and material duration drift", () => {
  const value = validSpec();
  value.creative.scenes.push({ ...value.creative.scenes[0], id: "22222222-2222-4222-8222-222222222222" });
  const messages = validateProjectSpec(value).errors.map(error => error.message);
  assert.equal(messages.includes("Scene order values must be unique"), true);
  assert.equal(messages.includes("Scene duration total must be within 10% of the target"), true);
});

test("rejects estimates above the approved cap", () => {
  const value = validSpec();
  value.budget.estimatedMicroUsd = value.budget.maxMicroUsd + 1;
  assert.equal(validateProjectSpec(value).errors.some(error => error.keyword === "budgetCap"), true);
});

test("rejects a current stage also marked complete", () => {
  const value = validSpec();
  value.workflow.completedStages.push(value.workflow.currentStage);
  assert.equal(validateProjectSpec(value).errors.some(error => error.keyword === "stageState"), true);
});

test("rejects incomplete or mismatched format-route answers", () => {
  const value = validSpec();
  delete value.routePlan.answers.scenePurpose;
  value.routePlan.answers.clipCount = 3;
  const errors = validateProjectSpec(value).errors;
  assert.equal(errors.some(error => error.path === "/routePlan/answers/scenePurpose" && error.message === "Answer is required"), true);
  assert.equal(errors.some(error => error.path === "/routePlan/answers/clipCount" && error.message === "Answer does not belong to the selected route"), true);
});

test("rejects a duration outside the selected format range", () => {
  const value = validSpec();
  value.brief.targetDurationSeconds = 60;
  value.creative.scenes[0].durationSeconds = 60;
  assert.equal(validateProjectSpec(value).errors.some(error => error.keyword === "routeDuration"), true);
});
