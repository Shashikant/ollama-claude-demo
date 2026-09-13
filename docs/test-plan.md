# Test Plan: US-001 — Complete Product Purchase

## 1. Overview
Verify that a registered customer can successfully navigate the entire purchase funnel—from authentication to order confirmation.

## 2. Test Strategy
- **Levels**: Functional, E2E, Regression.
- **Approach**: POM with Playwright TypeScript.
- **Browsers**: Chromium, Firefox, WebKit.

## 3. Test Scenarios
- **TC-01 (Happy Path)**: Full purchase flow.
- **TC-02 (Negative)**: Invalid login.
- **TC-03 (Negative)**: Locked out user.
- **TC-04 (Negative)**: Incomplete checkout form.
- **TC-05 (Edge)**: Cart quantity validation.
- **TC-06 (Edge)**: Remove items from cart.

## 4. Success Criteria
- All ACs (AC-01 to AC-06) are passing.
- All critical paths are automated.
- Allure reports generated with trace/screenshots on failure.
