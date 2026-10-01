import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { validateProjectSpec } from "../skills/acloud-video-director/scripts/validate-project-spec.mjs";

const exampleUrl = new URL("../skills/acloud-video-director/examples/single-scene.json", import.meta.url);
const validSpec = () => JSON.parse(fs.readFileSync(exampleUrl, "utf8"));

test("accepts the portable single-scene example", () => {
  assert.deepEqual(validateProjectSpec(validSpec()), { valid: true, errors: [] });
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
