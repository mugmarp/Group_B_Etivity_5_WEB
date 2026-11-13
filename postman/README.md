# SAMS API verification

This folder tests the shared backend; it does not implement separate attendance rules.
Keep request changes aligned with `backend/src/routes/` and the corresponding services.

## Import and run

1. Ask the backend team for a disposable, migrated, seeded test database and running API, or follow the root README to start one locally.
2. Import `SAMS.postman_collection.json` and `SAMS.local.postman_environment.json` into Postman.
3. Select **SAMS Local Demo**. Set `baseUrl` to the running origin plus `/api` (default `http://localhost:3000/api`).
4. Keep the synthetic seed password configured in the environment. The seed identities are `admin@demo.sams.test`, `examiner@demo.sams.test`, and `student@demo.sams.test`.
5. Run the entire collection in its existing order, with one iteration. The first request creates run identifiers; login tests save tokens and later tests save record IDs. Do not restart the health request halfway through a run.
6. Record failed request names, assertion messages, response status and a sanitized response body. Share these with the owner of the affected backend route.

The collection creates records and changes demonstration settings. Use only disposable test data. Never substitute the operational pilot URL for the local test URL.

## Understanding failures

| Symptom | What to check |
| --- | --- |
| Connection refused | Backend is running; host and port in `baseUrl` match it. |
| Health fails | Backend database connection and migrations. |
| Initial login returns 401 | Demo data was seeded and the environment password matches it. |
| Later request has an empty token or ID | An earlier request failed or the run started in the middle. |
| Expected 400/401/403/409 appears | Read the assertion: deliberate rejection is a passing negative test. |
| 429 response | Use the isolated test configuration described in the demo guide; do not weaken production limits. |
| Check-in expires during manual demonstration | Start a fresh run; check-in codes and windows are time limited. |

## Team handoff and evidence

Before changing a request, compare its method, path, role, body and expected result with the backend implementation. Preserve the ordered workflow and shared variable names. Do not change expected results simply to hide a backend defect.

For each verification run, record the commit, date, test environment, request/assertion totals and failures. Saved examples are illustrations, not evidence of a new successful run. Sanitize tokens, passwords and personal data before sharing reports.

The existing GitHub workflow runs Newman against its own PostgreSQL test service. For the presentation sequence and the command-line runner, see [POSTMAN_DEMO.md](../docs/POSTMAN_DEMO.md).

## Check collection scripts without a server

From the repository root, run:

```sh
node postman/check-collection.cjs
```

This checks request documentation, executable test-script syntax and environment setup. It does not send requests or establish that the API works. Run Newman for that verification.
