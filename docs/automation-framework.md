# Automation Framework Documentation

## Architecture
This framework uses a layered approach to maximize maintainability and scalability.

### Layers
1. **Page Object Model (POM)**: Encapsulates page-specific locators and actions in classes (`src/pages`).
2. **Fixtures**: Custom Playwright fixtures provide dependency injection of page objects into tests (`src/fixtures/testFixtures.ts`).
3. **Test Data**: Decoupled from logic, stored in JSON (`test-data/users.json`).
4. **Environment Config**: Managed via `.env` and `src/utils/env.ts`.

## Setup & Execution
### Installation
\`\`\`bash
npm install
npx playwright install --with-deps
\`\`\`

### Running Tests
\`\`\`bash
# Run all tests
npx playwright test

# Run specific test suite
npx playwright test tests/e2e/purchase.spec.ts

# Run on specific browser
npx playwright test --project=chromium
\`\`\`

### Reporting
The framework uses **Allure Report**.
\`\`\`bash
# Generate Allure results
npx playwright test

# Serve Allure report
npx allure serve allure-results
\`\`\`

## Design Patterns
- **BasePage Pattern**: All pages extend `BasePage` for common utilities.
- **Fixture Pattern**: Tests receive page objects as arguments, reducing boilerplate.
- **Data-Driven Testing**: Tests pull user profiles from `users.json`.
