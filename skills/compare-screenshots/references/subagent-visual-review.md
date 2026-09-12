# Independent visual review

Use this when history or prior conclusions could bias the main agent's visual
judgment and a second opinion is worth the cost.

## Reviewer context

- Use the available agent interface and image-attachment method. Isolate the
  reviewer from prior discussion when supported; disclose any blinding limits.
- Attach the two screenshots labeled `Image A` and `Image B`. Keep the mapping
  to candidate and baseline outside the reviewer's context.
- Supply the established visual target and relevant platform, viewport, UI
  state, content, camera, and accessibility constraints.
- Withhold chronology and previous verdicts, not the requirements or evidence
  needed to assess them.

## Prompt

```text
Review Image A and Image B independently against the supplied visual target.

Visual target: <the user's requirements and relevant design intent>
Platform and capture constraints: <relevant viewport, camera, state, and content>
Other constraints: <requirements that affect judgment but cannot be inferred from pixels>

Report:

1. Whether the images are comparable under the supplied capture constraints.
2. Major visible differences in camera/view, layout, content, missing details,
   labels/text, icons, color, lighting, depth/layering, clipping, artifacts,
   readability, or style.
3. Which image better satisfies the supplied target and why. Either, both,
   or neither may satisfy it.
4. A concise verdict and any requirements that cannot be verified from these
   captures. Do not infer interaction or motion correctness from static pixels.

Do not assume either image is preferred because of its label. Separate visible
observations from judgments against the requirements. State uncertainty if
the supplied target is insufficient; do not invent product intent.
```

## Use the result

- Treat the subagent result as independent evidence about which image is less
  wrong, not a replacement for your own inspection or relevant metrics. It is
  not a vote for whichever image is the baseline.
- If the subagent flags wrong camera, mismatched state, missing content, or
  visible artifacts, establish whether those are capture problems or actual
  product defects. Correct them only within authorized scope; otherwise report
  the finding or comparison limit.
- Use the evidence behind the verdict when deciding the next action. A second
  opinion does not authorize implementation or baseline updates.
