# Copilot instructions for this repo

## Project overview
This repository contains Playwright end-to-end tests for the SauceDemo application. The project uses TypeScript, the Playwright Test runner, page object model classes, custom fixtures, and JSON-backed test data.

## Key directories
- `tests/` – test specs grouped by feature area such as `auth`, `shopping`, and `e2e`
- `src/pages/` – page object classes that encapsulate UI interactions
- `src/fixtures/` – custom Playwright fixtures exported via `testFixtures.ts`
- `test-data/` – JSON fixtures for reusable users and test data
- `playwright.config.ts` – Playwright configuration, `baseURL`, reporters, and browser projects

## Coding conventions
- Prefer the existing page object pattern over raw `page.locator(...)` calls in tests.
- Reuse custom fixtures like `loginPage`, `productsPage`, `cartPage`, `checkoutPage`, and `productDetailsPage` when they already exist.
- Keep selectors stable and semantic. Prefer `data-test` attributes when available, for example `[data-test="firstName"]` and `[data-test="error"]`.
- When new page objects are needed, add a class in `src/pages/`, extend `BasePage`, and expose methods for actions like `login()`, `fillInformation()`, and `continueToOverview()`.
- Keep tests readable and scenario-focused: use `test.describe`, `test.beforeEach`, and explicit `expect(...)` assertions.
- Favor `waitForURL`, `locator.waitFor({ state: 'visible' })`, and other Playwright wait patterns instead of arbitrary sleeps.
- Store reusable user data in `test-data/*.json` rather than hard-coding credentials inline in tests.

## Testing workflow
- Run a single spec with: `npx playwright test tests/<feature>/<spec>.spec.ts --project=chromium`
- Run a single test by name with: `npx playwright test tests/<feature>/<spec>.spec.ts --project=chromium -g "test name"`
- Use the repo default browser matrix (`chromium`, `firefox`, `webkit`) when validating broad coverage.
- Treat test failures as UI behavior issues first: inspect selectors, waits, and page object methods before changing assertions.

## Quality expectations
- Keep changes minimal and fully aligned with the existing architecture.
- Preserve the established naming and import conventions.
- Do not add unnecessary libraries or test frameworks.
- Ensure new tests validate the user-visible behavior being exercised, not implementation details.

## Example patterns
- Test files should import from `../../src/fixtures/testFixtures` and use the shared `test` fixture object.
- Page object methods should return a Promise and encapsulate both interaction and waiting logic.
- Assertions should be targeted to Stable UI states such as URL changes or visible error text, not internal DOM state.
