---
description:  per-role model choices (overrides skill defaults)
alwaysApply: true
---
# model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model`). Alias entries in a panel list still count toward its fan-out.

## use the appropriate models from the matrix that is available to you
feature, refactoring: grok-4.6-fast-xhigh , gpt-5.6-sol-high, claude-opus-5-high
bug-fix: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, claude-opus-5-max
perf-issue: claude-fable-5-1-thinking-max , gpt-5.6-sol-high
hillclimb: claude-fable-5-1-thinking-max, gpt-5.6-sol-xhigh
judgment and prose: claude-fable-5-1-thinking-max, gpt-5.6-sol-xhigh
hardest tasks: claude-fable-5-1-thinking-max, gpt-5.6-sol-high
how explorer: grok-4.6-fast-xhigh, glm-5.3-flash, gpt-5.6-luna-medium
how explainer: claude-fable-5-1-thinking-max, gpt-5.6-sol-medium, glm-5.3-high
how critics: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
why investigators: grok-4.6-fast-xhigh, glm-5.3-flash, gpt-5.6-terra-high
why synthesizer: claude-fable-5-1-thinking-max, gpt-5.6-sol-max
arena runners: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh, glm-5.3-xhigh
arena cross-judge pool: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
swarm workers: grok-4.6-fast-xhigh, gpt-5.6-sol-medium, gpt-5.6-terra-high, claude-opus-5-thinking-high
architect runners: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh, gpt-5.6-sol-high
interrogate reviewers: claude-fable-5-1-thinking-max, gpt-5.6-sol-max, grok-4.6-fast-xhigh, claude-opus-5-thinking-xhigh
