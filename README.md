# Group B — E-tivity 5: Student Attendance Management System (SAMS)

**Course:** SWE2106 — Internet Technologies and Web Design  
**Due date:** Wednesday, 12th November 2026  
**Submission:** Team activity presentation  
**Repository:** https://github.com/mugmarp/Group_B_Etivity_5_WEB

---

## Task overview

The Academic Registrar at Mbarara University of Science and Technology (MUST) is digitizing departmental operations. Group B addresses **class attendance**: students see relevant classes and submit check-ins, lecturers manage session registers, and registrars manage accounts, academic placement, offerings and reports.

This repository is the team’s educational workspace for the E-tivity. Work is organised by starting modules so members can open focused pull requests while coordinating shared surfaces.

---

## Users and core workflow

| User | Main work |
|------|-----------|
| **Student** | View current/upcoming classes, submit a check-in, review personal attendance |
| **Lecturer** (`EXAMINER` in the API) | Create dated class sessions, open check-in, review/correct registers, prepare offline registers |
| **Registrar** (`ADMIN` in the API) | Manage accounts, academic placement, offerings, enrollment, timetable review and reports |

1. The registrar prepares offerings for an academic year/semester, assigns lecturers and publishes each programme group’s course plan. Matching students receive compulsory courses; electives are confirmed in My courses.
2. The lecturer creates a dated class and opens a short check-in window. The code rotates; the window cannot extend past class end.
3. The student signs in (email or registration number). A single current enrolled class is targeted when unambiguous; overlapping classes may require a choice.
4. The student submits the current code. The server checks identity, enrollment and time. A repeated accepted check-in returns the same record.
5. The lecturer reviews the register, applies corrections with reasons and completes the held class. Cancelled unheld classes are excluded from calculations.
6. Students see their own summaries. Lecturers and registrars view course reports and may download PDFs or save report snapshots.

---

## Stack

- **Frontend:** HTML, CSS, JavaScript (no separate frontend build)
- **Backend:** Node.js, Express (serves pages and `/api` from one origin)
- **Database:** PostgreSQL via Prisma
- **Validation:** Zod on request bodies
- **Verification:** Postman collection, backend and frontend tests

---

## Repository layout

```text
Group_B_Etivity_5_WEB/
├── backend/
│   ├── src/
│   │   ├── app.js             Express setup and route mounting
│   │   ├── server.js          Server entry point
│   │   ├── config/            Database connection and environment settings
│   │   ├── controllers/       Authentication handlers
│   │   ├── middleware/        Authentication, permissions and error handling
│   │   ├── routes/            API endpoints and request validation
│   │   ├── services/          Attendance, academic, timetable and report logic
│   │   └── utils/             Shared helpers and password policy
│   ├── prisma/
│   │   ├── schema.prisma      Database models and relationships
│   │   ├── migrations/        Versioned database changes
│   │   └── seed.js            Local sample records
│   ├── scripts/               Account provisioning, imports and syntax checks
│   └── tests/                 Backend API and service tests
├── frontend/
│   ├── public/
│   │   ├── *.html             Login, student, lecturer and registrar pages
│   │   ├── css/               Shared styles
│   │   ├── js/                Page behavior, API calls and offline storage
│   │   ├── sw.js              Service worker and application-shell cache
│   │   └── manifest.webmanifest
│   ├── scripts/               Frontend checks
│   └── tests/                 Browser workflow tests
├── data/                      Versioned academic reference data
├── postman/                   API collection and local environment template
├── deploy/native/             VPS services, Nginx and backup utilities
├── docs/                      Proposal, API, design and operating documentation
├── .github/workflows/         Automated verification
├── docker-compose.yml         Optional container setup
└── README.md                  Setup, workflows and project guide
```

Canonical module paths should be preferred over root-level or duplicate aliases (for example `backend/src/middleware/auth.js` rather than a second `auth.js` copy).

---

## Module ownership and coordination

Starting areas are flexible; related tests belong with each feature. Shared files need coordination, not whole-folder replacement. These are not exclusive ownership or team-lead appointments.

| Member | Starting module / files | Coordination |
|--------|-------------------------|--------------|
| Wokwaba Charles | Authentication: `backend/src/controllers/auth.js`, `backend/src/middleware/auth.js`, `frontend/public/js/login.js` | Coordinate JWT/password helpers and shared middleware; reconcile #8, #9 and #14 into canonical paths. |
| Kanyesigye Brian | Academic records and course plans: `data/academic_catalogue.json`, `backend/src/services/catalogue.js`, `course-setup.js`, `backend/src/routes/course-plans.js` | Coordinate `backend/prisma/`, seeds and course-plan pages; narrow future changes beyond the broad #13 import. |
| Kwesiga Lewis | Timetable and personal schedule: `backend/src/services/timetable.js`, `timetable-source.js`, `student-day.js`, `frontend/public/timetable.html`, `js/timetable.js` | Coordinate academic calendar/reference data with Brian and student schedule rendering with Annibow; #10 imported other services too. |
| Akatuwijuka Annibow | Student interface: `frontend/public/student.html`, `courses.html`, `js/student.js`, `js/courses.js`, `js/day-model.js` | Coordinate shared CSS sections; retain #15 history while correcting its deleted lecturer page through integration. |
| Natweta Cyril | Attendance rules and class actions: `backend/src/services/attendance.js`, `rules.js`; check-in/session handlers in `backend/src/routes/api.js` | Coordinate shared route edits with Mark, Charles and Edwine; keep reporting changes separate from attendance mutation. |
| Wawangula Generous | Lecturer interface: `frontend/public/examiner.html`, `frontend/public/js/examiner.js` | #6 is a duplicate-path import of an already present identical module. Agree on its disposition before submitting new lecturer improvements. |
| Mugendawala Mark Paul | Integration and hosting: `backend/src/config/`, `backend/src/app.js`, `backend/src/server.js`, `deploy/native/`, `.github/workflows/` | Coordinate package/lock files, release baseline and CI. Preserve module contributions while assembling a runnable shared tree; #5 covers config only. |
| Katto Andrew | Offline storage and synchronization: `frontend/public/js/offline.js`, `register-offline.js`, `frontend/public/sw.js`, `backend/src/services/sync.js`, `backend/src/routes/sync.js` | Coordinate API/session storage with Charles and Mark, prepared registers with Generous, pending student attempts with Annibow. |
| Nabaweesi Patricia Mirembe | Attendance reports: `backend/src/services/eligibility.js`, `pdf.js`, `frontend/public/admin.html`, `js/admin.js` | Coordinate the common counting helpers in `academic.js`; #11 added a duplicate attendance service, so reporting needs a correctly scoped follow-up. |
| Matovu Edwine Levi | Account management: `backend/src/routes/accounts.js`, `frontend/public/account.html`, `accounts.html`, `js/account.js`, `js/accounts.js` | Coordinate authentication helpers with Charles and migrations with Brian. #7 is a broad integration draft, not an isolated account-only diff. |
| Amen Joel Osuta | API and workflow verification: `postman/`, `backend/tests/`, `frontend/tests/` | Preserve the five validated checks and response examples from #12. No general `docs/` assignment; feature owners maintain their own explanations. |

Abbreviated filenames stay in the preceding directory; `js/` means `frontend/public/js/`.

### Shared surfaces (coordinate before editing)

| Surface | How to coordinate |
|---------|-------------------|
| `backend/prisma/schema.prisma`, migrations, seed | Brian coordinates model changes; keep published migrations immutable; add a new migration when needed |
| `backend/src/routes/api.js`, `app.js`, `server.js` | Mark coordinates integration; others change only their endpoint sections |
| `frontend/public/js/api.js`, `common.js`, `login.js` | Charles, Andrew and Mark for auth/session/queue behaviour |
| `frontend/public/css/styles.css` | Scope styles to the affected page; do not reformat the whole sheet alone |
| `frontend/public/sw.js`, manifests | Andrew with page authors and Mark |
| `services/academic.js`, `student-day.js` | Patricia, Lewis and Brian for counting / enrollment / timetable effects |
| `postman/` collection | Joel coordinates request order and examples; preserve unique cases before overwrite |
| Package manifests, locks, CI | Prefer the integration owner’s PR |

---

## Contributing

- Prefer **one focused PR per module area** rather than large catch-all diffs.
- Distinguish baseline files from new changes in the PR description.
- State **which checks actually ran** (and on which head).
- Suggested PR body shape:
  - **What changed** — files and behaviour
  - **Why** — problem or coordination need
  - **Coordination** — who else is affected
  - **Checks** — what was verified

Preserve accepted PR history. Compare duplicate paths before removing aliases. Do not mix attendance **mutation** (Cyril) with **reporting** (Patricia).

---

## Assessment criteria

- **Teamwork** — each member’s responsibility documented; GitHub PRs from every member
- **API design** — clear, structured endpoints
- **Input validation** — robust validation on requests
- **Useful responses** — meaningful status codes, errors and data shapes
- **Presentation readiness** — every member can explain design and implementation

---

## Group B members

| No. | Name | Registration No. | GitHub |
|-----|------|------------------|--------|
| 1 | Wokwaba Charles | 2025/BSE/187/PS | [@wokwabacharles4-jpg](https://github.com/wokwabacharles4-jpg) |
| 2 | Kanyesigye Brian | 2025/BSE/080/PS | [@brian-khan](https://github.com/brian-khan) |
| 3 | Kwesiga Lewis | 2025/BSE/097/PS | [@lewiskwesiga-dot](https://github.com/lewiskwesiga-dot) |
| 4 | Akatuwijuka Annibow | 2025/BSE/030/PS | [@aannibow-wq](https://github.com/aannibow-wq) |
| 5 | Natweta Cyril | 2025/BSE/132/PS | — |
| 6 | Wawangula Generous | 2025/BSE/184/PS | [@wagegenerous-pixel](https://github.com/wagegenerous-pixel) |
| 7 | Mugendawala Mark Paul | 2025/BSE/108/PS | [@mugmarp](https://github.com/mugmarp) |
| 8 | Katto Andrew | 2025/BSE/085/PS | [Andie-sources](https://github.com/Andie-sources/) |
| 9 | Nabaweesi Patricia Mirembe | 2025/BSE/120/PS | [@2025bse120-sketch](https://github.com/2025bse120-sketch) |
| 10 | Matovu Edwine Levi | 2025/BSE/105/PS | [@Edwinelevi](https://github.com/Edwinelevi) |
| 11 | Amen Joel Osuta | 2025/BSE/152/PS | [@amenosuta](https://github.com/amenosuta) |

---

## Project status

Chosen process: **class attendance (SAMS)**. Module starting areas and coordination notes are listed above. Integration continues toward a runnable shared tree (config, app/server entrypoints, package manifests and role pages). Feature owners keep explanations with their modules; verification assets live under `postman/`, `backend/tests/` and `frontend/tests/`.

---

## License

Academic project for SWE2106 — Internet Technologies and Web Design, MUST (2026).
