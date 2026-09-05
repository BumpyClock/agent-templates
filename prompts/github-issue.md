---
name: Review issue
description: spin up a subagent to fetch the details of an issue and investigate.
arguments:
  - name: ISSUE_NUMBER
    type: string
---


# Handle user prompt
Please get the details for the following issue(s): $ISSUE_NUMBER


Relevant skills `programming` (use `systematic-debugging/guide.md` when needed), `test-driven-development` (use only when explicitly required), `dispatching-parallel-agents`. Read the skills you feel you need to complete the tasks before proceeding, do not read skills you don't need.

Fetch issue $ISSUE_NUMBER with the available GitHub tools.
For `all`, `all issues`, or no argument, fetch the repository's issues.

Once you have fetched the issue details, spin up parallel sub-agents (as many as needed) to analyze them and investigate the root cause of the issues. Not all issues are valid or reproducible so verifying them is critical. Once the issues have been validated, aggregate the valid issues and generate a comprehensive investigation summary.


## Invalid issue handling
For issues that are invalid or not reproducible, document the reasons why and suggest any additional information needed to properly investigate them. Use the gh cli to comment that the issue is invalid and the reasons why (already fixed, cannot reproduce, insufficient information, etc). if the issue is already fixed, reference the relevant PR or commit that resolved it. Do not close the issue, it will close when we merge the PR. if possible use the gh cli to find the commit that solved that issue. use the gh cli to close the issue.

## Valid issues handling
For valid issues, spin up parallel sub-agents to investigate possible solutions and present the user with options for resolving the issues. Group similar issues together where possible to streamline the resolution process. Once solutions have been identified, create a summary report detailing the investigation findings, proposed solutions, and any follow-up actions required.

focus on comprehensive solutions rather than hacks or workarounds, if refactor is needed let the user know to ensure it improves code quality and maintainability.

If you're in plan mode create a comprehensive plan to resolve the issue. 

To fix the issue, create a branch named `fix/issue-<ISSUE_NUMBER>` from the repository's base branch.
Use the `programming` skill for the fix.
For authorized PR creation, follow the PR conventions in the active global instructions.
Reference the issue in the PR description.

Ensure all changes are tested thoroughly and there are no linting and formatting issues before creating the PR. 
