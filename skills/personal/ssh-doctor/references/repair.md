# SSH repair safeguards

Use this reference only when the user requests repair of the diagnosed SSH failure.
Establish the target host, affected service, and authorized change before a mutation.
Keep read-only evidence from the diagnosis.

## Remote Login and service restart

Enabling Remote Login changes host access.
Require explicit authorization for that access change.
Inspect the existing access restrictions before enabling the service.

A service restart can interrupt remote work.
Check for active sessions and confirm an independent recovery path before a restart.
If the current SSH connection is the only recovery path, stop and ask for a safe maintenance method.
Change only the service or setting that the evidence identifies.

## Stranded sessions

Inspect each suspected process ID, owner, parent, start time, terminal, child processes, and network connections.
Distinguish a demonstrated stranded session from a legitimate shell or transfer.
A process-name match or PID 1 parent does not establish that a session is stranded.

Select only the verified stranded process IDs.
Recheck their identities immediately before termination.
Do not pipe every matching sshd process into a termination command.
Send TERM to the selected processes first.
Escalate to KILL only for demonstrated remaining blockers within the authorized repair scope.
Preserve active sessions and the recovery connection.

## Configuration and completion

Preserve a recoverable copy before an authorized configuration edit.
Validate the edited configuration before a service restart.
Recheck the original failed connection path after repair.
Report the exact changes, observed result, and residual risks.

Credential transfer and profile modification are separate tasks.
Do not copy service-account credentials as part of an SSH repair.
