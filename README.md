# Vericy Test Automation Framework

Hybrid Cypress end-to-end test framework for UI and API testing, built with JavaScript and Cypress v15.x. It emphasizes simplicity, maintainability, and environment-driven configuration.

## Overview
- UI tests target an application via `baseUrl` configured from environment.
- API tests use `CYPRESS_API_BASE_URL` with absolute requests.
- Environment selection is automatic via `.env`, `.env.staging`, `.env.acceptance` using `CYPRESS_ENV` or `NODE_ENV`.
- Allure writer is enabled to produce results under `reports/allure-results`.

## Features
- Cypress UI tests , assertions using selectors and text).
- Cypress API tests  built from `Cypress.env('apiBaseUrl')`).
- Environment-based configuration using `dotenv`.
- Allure results generation (writer) for reporting artifacts.
- Opinionated project layout for clarity and scalability.

## Architecture
- `cypress.config.js`
  - Loads environment with `dotenv` from `.env.<env>` or `.env`.
  - `e2e.baseUrl` from `CYPRESS_UI_BASE_URL`.
  - `env.apiBaseUrl` from `CYPRESS_API_BASE_URL`.
  - Initializes Allure writer.
- `cypress/support/e2e.js`
  - Global support: imports commands and Allure plugin.
- Specs
  - UI: relative navigation against `baseUrl`.
  - API: absolute requests using `Cypress.env('apiBaseUrl')`.

## Folder Structure
```
vericy-framework/
├─ cypress/
│  ├─ e2e/
│  │  ├─ ui/
│  │  │  └─ ui.cy.js
│  │  └─ api/
│  │     └─ test.cy.js
│  ├─ fixtures/
│  │  └─ example.json
│  └─ support/
│     ├─ commands.js
│     └─ e2e.js
├─ .env
├─ .env.staging
├─ .env.acceptance
├─ cypress.config.js
├─ package.json
├─ LICENSE
└─ README.md
```

## Installation
- Prerequisites: Node.js 18+ (recommended: 20.x) and npm.
- Install dependencies:
```
npm install
```

## Environment Setup
- Files:
  - `.env` (default)
  - `.env.staging`
  - `.env.acceptance`
- Variables:
  - `CYPRESS_UI_BASE_URL` → UI base URL (e.g., `https://v1.practicesoftwaretesting.com/`).
  - `CYPRESS_API_BASE_URL` → API base URL (e.g., `https://reqres.in/api`).
  - `CYPRESS_ALLURE_RESULTS_DIR` → Allure results output (default `reports/allure-results`).
- Selection:
  - If `CYPRESS_ENV` or `NODE_ENV` is set to `staging`, loads `.env.staging`; if `acceptance`, loads `.env.acceptance`; otherwise `.env`.

### Setting environment per shell
- Windows PowerShell:
```
$env:CYPRESS_ENV='staging'
npm run test-ui
```
- Linux/macOS (Bash/Zsh):
```
CYPRESS_ENV=staging npm run test-ui
```
- Override base URLs ad hoc:
```
# PowerShell
$env:CYPRESS_UI_BASE_URL='https://yourapp.example.com'
npm run test-ui

# Bash/Zsh
CYPRESS_API_BASE_URL='https://api.staging.example.com' npm run test-api
```

## How To Run Tests
- UI tests:
```
npm run test-ui
```
- API tests:
```
npm run test-api
```
- All UI + API:
```
npm run test-all
```
- Interactive runner:
```
npx cypress open
```

## Reporting
- The Allure writer is enabled; results are saved to `reports/allure-results`.
- To view reports, install the Allure CLI (optional) and generate an HTML report:
```
# Example (requires allure-commandline installed and on PATH)
allure generate reports/allure-results --clean -o reports/allure-report
allure open reports/allure-report
```

## Contribution Guide
- Branching:
  - Feature branches: `feature/<short-description>`
  - Fix branches: `fix/<short-description>`
- Commit messages:
  - Use concise, imperative subject lines (e.g., `Add test-ui script`).
- Code style:
  - Keep specs small and focused; prefer helpers for repeated logic.
  - Use environment-driven URLs; avoid hardcoding.
- Tests:
  - UI: rely on `baseUrl` and use stable selectors.
  - API: use `Cypress.env('apiBaseUrl')` with absolute URLs.

## Troubleshooting
- Missing or wrong base URL:
  - Ensure `.env` or appropriate `.env.<name>` is loaded and values are correct.
- 401 Unauthorized in API tests:
  - Add necessary headers or tokens:
```
cy.request({
  method: 'GET',
  url: `${Cypress.env('apiBaseUrl').replace(/\/$/, '')}/users`,
  headers: { Authorization: `Bearer <token>` },
  failOnStatusCode: false
})
```
- Adjust timeouts for slow pages:
  - Use `defaultCommandTimeout` or `pageLoadTimeout` in `cypress.config.js`.
- Unset environment variable (PowerShell):
```
Remove-Item Env:CYPRESS_ENV -ErrorAction SilentlyContinue
```
- Unset environment variable (Bash/Zsh):
```
unset CYPRESS_ENV
```

## License
This project is licensed under the MIT License. See `LICENSE` for details.
tita1234