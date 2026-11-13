# Local Postman validation — 12 November 2026

Backend baseline: `6df288a5af28ce15169dd180b3ba1f403235eca2` (main).
Database: dedicated local `sams_test`, PostgreSQL 16.16, eight migrations applied and fictional demo seed loaded. API bound to loopback in test mode. Runner: Newman 6.2.3.

| Verification | Result |
| --- | --- |
| Existing collection baseline | 129 requests, 337 assertions, zero failures |
| Updated collection | 134 requests, 362 assertions, zero failures |
| Backend JavaScript syntax | Passed |
| Collection scripts and saved examples | Checked with `node postman/check-collection.cjs` |

Five added validation requests check the login and password-change contracts in `backend/src/routes/api.js` and `backend/src/routes/accounts.js`. No backend behavior was changed. The original workflow order is preserved, with the added rejections immediately after the three initial successful logins.

The contribution adds missing response examples from the successful run and corrects the missing-email example. Sensitive response fields and generated identities are redacted in new examples. The report PDF's binary body is omitted. Raw Newman reports remain outside version control because they contain temporary test tokens and credentials.

Passing this collection does not resolve or fully cover the project's open audit findings. Browser tests and the complete backend test suite were not rerun for this Postman-only contribution.

To reproduce, use the setup in [README.md](README.md), then the Newman command in [POSTMAN_DEMO.md](../docs/POSTMAN_DEMO.md). Run only against a disposable seeded database, starting with the first request.
