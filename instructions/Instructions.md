
# Copilot Instructions (Playwright JS/TS - DRY Focus)

## DRY Principles
- Avoid repeating selectors, actions, or setup across tests. Suggest extracting them into:
  - Page Object methods
  - Reusable fixture functions
  - Helper utilities if not page-specific

## Page Objects (POM)
- Encourage creating one class per page.
- Only expose "actions with intent" (e.g., login(), filterBy(), addToCart()).
- Keep locators and repetitive logic inside the page object to enforce DRY.
- No assertions inside page objects.

## Fixtures
- If repeated setup (login, preloaded data, URL navigation) appears in multiple tests, suggest replacing it with `test.extend()` fixtures.
- Use storageState for repeated authentication.
- Keep per-test setup in fixtures, NOT in test files.

## Tests
- Tests must focus on "what" not "how".
- If Copilot sees repetitive test steps, suggest:
  - a new POM method
  - a fixture
  - or a shared helper
- Use Playwright’s built‑in auto-waiting; no hard waits.

## Locators
- Prefer stable locators:
  - `getByRole`
  - `getByLabel`
  - test IDs
- If a locator repeats across tests, centralize in a page object.

## Code Quality
- Keep tests small and readable.
- No duplicate code blocks; always refactor into DRY components.
- Prefer TypeScript.
