# Final Thoughts on Testing React Components

## Test 1 and Test 2: Use the Right Selector

- Always use the most appropriate and specific selector for your queries.
- Be careful about duplicate selectors.
- If in doubt, try removing the action and see if the test still passes, this can reveal false positives.

## Test 3: Await Your Assertions

- Ensure that any assertion depending on asynchronous updates is properly awaited.
- Use `await waitFor(...)` or `await findBy...` to guarantee the assertion runs after the UI updates.

---

## Additional Best Practices

### Always Mock Axios

- Ensure all network requests (e.g., via axios) are mocked to avoid real HTTP calls and ensure test isolation.

### Debugging the DOM

- Use `screen.debug(undefined, Infinity)` to print the entire DOM tree.
  - The first argument (`undefined`) means print the whole document, not just a specific element.
  - The second argument (`Infinity`) sets the maximum length of the output, so nothing is truncated.
  - Can be used with rendering components not just pages.

### Prefer `userEvent` over `fireEvent`

- `userEvent` simulates real user interactions more accurately than `fireEvent`.
- This is especially important if your component library relies on real browser events.

---

## Test Design Mindset

- These errors are less likely if you practice Test-Driven Development (TDD). If not, you might be doing Test-Later Development (TLD).
- When writing or reviewing tests:
  - Switch your mindset away from the developer who wrote the code.
  - Doubt your implementation—try to break it on purpose.
  - Treat the code as if it was written by someone else.
  - Start testing from the lowest level (unit) and work upwards.
  - Don't focus solely on code coverage; ensure you cover all meaningful scenarios, it's okay to have multiple tests covering the same code path if they validate different behaviours or edge cases.

---
