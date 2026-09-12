---
name: create-verification-skill
description: "Create and prove a project-local skill for driving real app behavior."
disable-model-invocation: true
---

# Create a verification skill

This skill creates a project-local `verify-<app>` skill that exercises the real app and captures evidence.
Write for an agent that has no prior app context.
Use the repository's existing skill location for the active harness.
If none exists, use the harness's documented project-local discovery path.
Below, `<project-skills-dir>` denotes that selected path, not a literal directory name.

## 1. Interview the repo, not the user

Answer these from the codebase and only ask the user what you cannot observe:

- **Surface:** what does a user actually touch? A web UI, a CLI/TUI, a desktop app, an API, a mobile app, a library? A repo can have several; pick the primary one and note the rest.
- **Run:** how does the app start locally? Prefer the repo's own documented dev command (package scripts, Makefile, README quickstart). Note ports, env vars, seed data, auth.
- **Drive:** how can an agent interact with it programmatically? Existing harnesses first — Playwright/Cypress specs, expect scripts, PTY helpers, curl-able endpoints, a debug port. Only then pick a generic recipe: browser/CDP for web and Electron, a tmux/PTY harness for CLI/TUI, plain HTTP for services.
- **Observe:** what evidence can be captured? Screenshots, terminal transcripts, response bodies, logs, exit codes, DB state.
- **Isolate:** can two instances run side by side (ports, data dirs, profiles)? If not, say so in the generated skill: refusing to double-drive a shared instance beats corrupting the user's session.

Repairs to generated helpers, selectors, and safe local verification setup are within the generation task. Correct those issues and retry the affected step without another approval.
Product changes require their own authorization. A failed startup or proof does not authorize changing shared services, account settings, or credentials.
If startup remains blocked, preserve the supported instructions as a draft and identify the exact step and unmet precondition. Do not invent commands or claim the app was verified.
Use disposable fixtures only when they do not bypass behavior under verification.
Document each fixture and its cleanup.

## 2. Generate the skill

Write `<project-skills-dir>/verify-<app>/SKILL.md` with YAML frontmatter.
Use `name: verify-<app>` and a description that names the app, its user interface, and the activation condition.
Resolve all placeholders against the repo.
State the authorized instance, data, accounts, and side effects in the generated skill. Prefer an isolated local or test environment. Sending real messages, publishing data, changing access, or making other external mutations requires explicit authorization for those effects. Generating a verification skill does not grant it.
Include these sections:

- **Launch:** the exact command that starts the app for verification and the readiness signal. Include teardown. For a short-lived CLI or TUI, build once when needed, then start each drive in its own isolated PTY or tmux session. Reuse a valid build until changes or failures require rebuilding.
- **Doctor:** a read-only readiness check for the instance, build, ownership, and authentication relevant to the proof. Reuse valid evidence; repeat the check when state changes or a failure calls it into question.
- **Drive:** the harness recipe with real selectors/commands from this repo, not examples. Prefer stable handles (ARIA labels, data attributes, prompt strings, route paths) over coordinates and tab order.
- **Evidence:** what to capture for a proof and where it goes. Exercise the real user path, not internal setters or test-only endpoints. Capture the action and resulting state, including authorized side effects. Use mocks only where a production boundary already isolates the external system. Establish the effects of a dry-run or test mode before executing it, then observe permitted file, network, or git-ref effects rather than trusting the mode's name. Report skipped behavior as unverified.
- **Cleanup:** how to tear down instances the run created. Never kill by process name; kill what you started. Cleanup removes instances and scratch state, never the evidence: proof artifacts survive the teardown, in a location the skill names.
- **Helpers:** any script the skill ships is executable and its invocation is shown in the skill body. A helper the reader has to reverse-engineer is not a helper.

## 3. Seed the feature map

Create `<project-skills-dir>/verify-<app>/features/README.md` plus feature files for the initial scope.
Start with the primary user paths from routes, commands, menus, or docs.
Follow the shape in [`references/feature-map-example/`](references/feature-map-example/), with a README index and one file per feature. Each file answers, from the user's point of view: what the feature is, how to reach it, how to drive it with the harness, and what observable end state proves it works. The four H2s are `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, and `Gotchas`. The map is the repo's maintained verification source; a proof that drives one convenient entry point is incomplete when the map lists others.

## 4. Prove the generated skill before handing it over

Run the generated instructions end to end for one authorized, isolated mapped feature. Launch, check readiness, drive the feature, capture evidence, and clean up. One feature is enough for this initial proof; do not imply the rest of the map was verified.

After a failure, run the generated cleanup for instances and scratch state created by that attempt. Preserve its evidence. Repair generated helpers, selectors, or safe local setup and rerun the affected proof. Do not repeat unrelated baselines, make unapproved product changes, or bypass behavior just to obtain a passing result.

After successful cleanup, confirm the evidence still exists at the named location. Stop when that proof passes or no safe in-scope correction can advance the blocked step. If proof requires unavailable access or new authority, preserve the generated draft and report the exact unverified step, attempted command, and unmet precondition. An unexecuted or failed proof is not a verified deliverable.

## 5. Explain maintenance

Report the generated skill path, proof status, feature exercised, and any remaining verification limits.
When app behavior changes, update the affected feature recipes and repeat their proof.
Suggest a maintenance cadence only if the user asks.
