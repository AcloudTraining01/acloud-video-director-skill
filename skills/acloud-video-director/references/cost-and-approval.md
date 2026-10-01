# Cost and approval

Before a billable call, freeze:

- project and spec revision;
- capability, provider, model, and operation;
- quantity, duration, resolution, and retry count;
- estimated currency cost and platform credits;
- idempotency key and maximum approved spend;
- expected output and fallback policy.

The estimate is informational until the backend creates a usage reservation. A retry reuses the same idempotency identity when it represents the same operation. Ambiguous provider outcomes remain reserved for reconciliation.

`fallbackPolicy` values:

- `fail`: stop and report the missing capability.
- `ask`: prepare the alternative and request approval before switching.
- `approved_local_only`: use only already-approved local alternatives.

Never downgrade generated motion to still images, change narration, or switch render runtime without recording the decision and revalidating affected approvals.
