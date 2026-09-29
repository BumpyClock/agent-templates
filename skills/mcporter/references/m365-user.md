# Microsoft 365 people

Alias `m365-user`. Use this server to resolve identities before using IDs in other workloads.

```bash
mcporter call m365-user.GetMyDetails --args '{}' --output json
mcporter call m365-user.GetMultipleUsersDetails --args '{"searchValues":["Example Person"],"propertyToSearchBy":"displayName","select":"id,displayName,userPrincipalName,mail","top":5}' --output json
mcporter call m365-user.GetUserDetails --args '{"userIdentifier":"me","select":"id,displayName,userPrincipalName"}' --output json
```

`GetUserDetails` accepts only `me`, a user principal name, or an Entra object ID.
Use `GetMultipleUsersDetails` for display names, aliases, partial names, or SMTP email addresses.
Resolve ambiguous matches before using an identity in an account write.
Select only needed properties. `GetManagerDetails` and `GetDirectReportsDetails` cover organization relationships.
