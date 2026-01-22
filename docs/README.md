# FE Day React Testing Demo

> ## Live presentation demo: Intentionally broken tests with one-line fixes

---

## Table of Contents

- [Overview](#overview)
- [Test Types: What Should You Present?](#test-types-what-should-you-present)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Component Overview](#component-overview)
- [The 5 Broken Tests Explained](#the-5-broken-tests-explained)
- [Debug Tips & Tricks](#debug-tips--tricks)
- [Presentation Flow](#presentation-flow)
- [Common Testing Pitfalls](#common-testing-pitfalls)

---

## Overview

This project demonstrates common React testing mistakes and their fixes. Perfect for a live coding demo where you:

1. Run a broken test
2. Show the error message
3. Explain the issue
4. Apply a one-line fix
5. Re-run to show it passes

**Tech Stack:**

- React 18
- Vite 5 (dev server)
- Jest 29
- React Testing Library
- Axios (mocked with Jest)

---

## Test Types: What Should You Present?

### For FE Day, I recommend discussing **Component Tests** (also called Integration Tests)

**Why Component Tests?**

- **Most practical for frontend work** - Tests components as users interact with them
- **Balance of confidence and speed** - Not too granular, not too broad
- **Aligns with React Testing Library philosophy** - "Test behavior, not implementation"
- **Great for demos** - Visual, relatable, and engaging  

**Comparison:**

|Type|Scope|Speed|When to Use|
|------|-------|-------|-------------|
|**Unit Tests**|Single function/method|Very fast|Pure utility functions, helpers|
|**Component Tests**|Single component + hooks/state|Fast|UI components, user interactions|
|**Integration Tests**|Multiple components|Moderate|Feature flows, page-level tests|
|**E2E Tests**|Full application|Slow|Critical user journeys|

**What we're testing in this demo:**

- Component rendering
- User interactions (button clicks)
- Async state updates (loading, success, error)
- API call mocking
- Conditional rendering

This is **component-level testing** with some integration aspects (testing state + UI together).

**Presentation Talking Points:**
> "Today we're focusing on component tests using React Testing Library. This is the sweet spot for frontend testing - we test components the way users interact with them, without worrying about implementation details. We mock external dependencies like API calls, but we test the full component behavior including hooks, state, and rendering."

---

## Project Structure

```text
FE Day/
├── src/
│   ├── components/
│   │   ├── UserProfile.jsx                    # Main component (50 lines)
│   │   └── __tests__/
│   │       ├── UserProfile.test1.broken.js    # Typo in assertion matcher
│   │       ├── UserProfile.test2.broken.js    # Missing await
│   │       ├── UserProfile.test3.broken.js    # Missing mock implementation
│   │       ├── UserProfile.test4.broken.js    # Wrong mock data structure
│   │       ├── UserProfile.test5.broken.js    # Forgot to mock axios.put
│   │       ├── UserProfile.tests.fixed.js     # All tests fixed (reference)
│   │       ├── UserProfile.examples.js        # Meaningful test scenarios (NEW!)
│   │       └── UserProfile.debugging.js       # Debugging demonstrations (NEW!)
│   └── setupTests.js                          # Jest setup with comments
├── PRESENTATION.md                            # Presentation script & talking points
├── TEST-EXAMPLES.md                           # Guide to meaningful tests
├── DEBUGGING-TIPS.md                          # Complete debugging reference
├── QUICK-START-DEMOS.md                       # Quick start for demos
├── AUDIENCE-QUESTIONS.md                      # Potential audience Q&A (NEW!)
├── package.json                               # Dependencies & scripts
├── .babelrc.js                                # Babel config
└── README.md                                  # This file
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server (Live Demo)

```bash
npm run dev
```

This opens the app at <http://localhost:3000> where you can:

- See the UserProfile component in action
- Click "Fetch User" to demo the functionality
- Show the live UI during your presentation

### 3. Run Individual Broken Tests

```bash
# Test 1: Typo in assertion (easiest)
npm run test:broken1

# Test 2: Missing await
npm run test:broken2

# Test 3: Missing mock implementation
npm run test:broken3

# Test 4: Wrong mock data
npm run test:broken4

# Test 5: Forgot to mock function (hardest)
npm run test:broken5
```

### 4. Run Fixed Tests (Reference)

```bash
npm run test:fixed
```

### 5. Run Example Tests (NEW!)

**Demonstrates meaningful test scenarios from TEST-EXAMPLES.md:**

```bash
npm run test:examples
```

This test suite includes:

- Critical path tests (happy path, error handling)
- Edge cases (null data, rapid clicks, missing properties)
- Coverage examples (branch & statement coverage)
- Integration tests (complete user flows)
- Anti-patterns (what NOT to test - commented out)

**Run this during Q&A to show different test scenarios!**

### 6. Run Debugging Tips (NEW!)

**Interactive debugging demonstrations from DEBUGGING-TIPS.md:**

```bash
npm run test:debugging
```

This test suite demonstrates:

- `screen.debug()` variations
- `logRoles()` for finding elements
- Debugging async timing issues
- Query differences (query vs get vs find)
- Event handler verification
- Custom debug helpers
- Accessibility debugging

**Run with console output visible to see debugging in action!**

### 7. Run All Tests

```bash
npm test
```

**Expected result:** Some failed (broken tests), rest passed (fixed/examples/debugging tests)

---

## Component Overview

### UserProfile Component

**File:** `src/components/UserProfile.jsx`

**Features:**

- Fetches user data (uses mock data in browser, real API calls in tests)
- Button click interaction
- Loading state (button disabled + text change)
- Error handling (displays error message)
- Conditional rendering (shows user info when loaded)

**Component Logic:**

```text
1. Initial state: no user, not loading, no error
2. Click "Fetch User" button → triggers fetchUser()
3. Sets loading=true, makes axios.get() call
4. On success: sets user data, loading=false
5. On error: sets error message, loading=false
6. UI updates based on state (loading, error, or user data)
```

**What we're testing:**

- Button renders correctly
- Loading state appears/disappears
- User data displays after successful fetch
- Error message shows on failed fetch
- All user properties (name, email, age) display

---

## The 5 Broken Tests Explained

### Tests are ordered by difficulty: easiest to hardest

### Test 1: Typo in Assertion Matcher  (EASIEST)

**File:** `UserProfile.test1.broken.js`

**The Bug:**

```javascript
expect(screen.getByText(/loading\.\.\./ i)).toBeInTheDocumnet();
//                                          ^^^^^^^^^^^^^^^^^^
//                                          Typo: should be toBeInTheDocument
```

**What Happens:**

- Jest doesn't recognize the matcher `toBeInTheDocumnet`
- Throws error: "expect(...).toBeInTheDocumnet is not a function"

**The Fix:**

```javascript
expect(screen.getByText(/loading\.\.\./ i)).toBeInTheDocument();
```

**Key Learning:** Typos in matchers cause immediate failures. Common ones:

- `toBeInTheDocumnet` → `toBeInTheDocument`
- `toHaveBeenCalledWith` → `toHaveBeenCalledWith`
- `toBeVissible` → `toBeVisible`

---

### Test 2: Missing `await` / Async Handling  (EASY)

**File:** `UserProfile.test2.broken.js`

**The Bug:**

```javascript
// FIX: Add 'await' before waitFor
waitFor(() => {
  expect(screen.getByRole('alert')).toBeInTheDocument();
});
```

**What Happens:**

- Test doesn't wait for async operation to complete
- Assertions run before component updates
- Test finishes before error message appears
- Fails with: "Unable to find an element with role 'alert'"

**The Fix:**

```javascript
await waitFor(() => {
  expect(screen.getByRole('alert')).toBeInTheDocument();
});
```

**Key Learning:** Always `await` async operations in tests:

- `await waitFor(() => ...)`
- `await screen.findBy...()` (built-in waiting)
- `await fireEvent.click()` if needed

---

### Test 3: Missing Mock Implementation  (MEDIUM)

**File:** `UserProfile.test3.broken.js`

**The Bug:**

```javascript
axios.get;  //  Just references axios.get, doesn't mock it!
```

**What Happens:**

- axios.get is not mocked, returns undefined
- Component tries to access undefined.data → crashes
- Test fails with: "Cannot read properties of undefined (reading 'data')"

**The Fix:**

```javascript
axios.get.mockResolvedValue({
  data: { name: 'John Doe', email: 'john@example.com', age: 30 }
});
```

**Key Learning:** Always define what your mocks should return!

---

### Test 4: Wrong Mock Data Structure  (MEDIUM-HARD)

**File:** `UserProfile.test4.broken.js`

**The Bug:**

```javascript
axios.get.mockResolvedValue({
  data: { 
    name: 'John Doe', 
    email: 'john@example.com'
    //  Missing: age property
  }
});

// But test expects:
expect(screen.getByText(/age: 30/i)).toBeInTheDocument();  //  Fails!
```

**What Happens:**

- Mock data doesn't match component expectations
- Component renders `Age: undefined`
- Test can't find "Age: 30"
- Fails with: "Unable to find text: /age: 30/i"

**The Fix:**

```javascript
axios.get.mockResolvedValue({
  data: { 
    name: 'John Doe', 
    email: 'john@example.com',
    age: 30  //  Added missing property
  }
});
```

**Key Learning:** Mock data structure must match what your component expects!

---

### Test 5: Forgot to Mock a Specific Function  (HARDEST)

**File:** `UserProfile.test5.broken.js`

**The Bug:**

```javascript
axios.get.mockResolvedValue({ /* ... */ });  //  Mocked

//  But axios.put is NOT mocked!
// Component might call axios.put() later
```

**What Happens:**

- Only `axios.get` is mocked
- If component calls `axios.put`, it's undefined or makes real request
- Test may fail or have unpredictable behavior

**The Fix:**

```javascript
axios.get.mockResolvedValue({
  data: { name: 'John Doe', email: 'john@example.com', age: 30 }
});

axios.put.mockResolvedValue({  //  Also mock PUT
  data: { name: 'John Doe', email: 'newemail@example.com', age: 30 }
});
```

**Key Learning:** Mock ALL methods that your component might call!

---

## Debug Tips & Tricks

### Interactive Demos Available

**See these debugging techniques in action:**

```bash
npm run test:debugging
```

This runs [UserProfile.debugging.js](/src/components/__tests__/UserProfile.debugging.js) which demonstrates all tips below with console output.

---

### 1. **See What's Rendered** - `screen.debug()`

Add this anywhere in your test to see the current DOM:

```javascript
import { screen } from '@testing-library/react';

test('my test', () => {
  render(<UserProfile />);
  
  screen.debug();  // Prints entire DOM
  
  // Or debug with unlimited output (no truncation):
  screen.debug(undefined, Infinity);
  
  // Or debug a specific element:
  const button = screen.getByRole('button');
  screen.debug(button);
});
```

**When to use:**

- Component not rendering as expected?
- Can't find an element?
- Debug to see actual vs. expected HTML!

**💡 See it in action:** Run `npm run test:debugging` and check the console output for TIP 1-3

---

### 2. **Discover Available Roles** - `logRoles()`

```javascript
import { logRoles } from '@testing-library/react';

test('discover elements', () => {
  const { container } = render(<UserProfile />);
  
  logRoles(container);
  // Outputs all accessible roles: button, heading, alert, etc.
});
```

**💡 See it in action:** Run `npm run test:debugging` - check TIP 6-7

---

### 3. **Check Available Queries** - `screen.logTestingPlaygroundURL()`

```javascript
screen.logTestingPlaygroundURL();
// Outputs: https://testing-playground.com/#markup=...
```

Paste the URL in your browser to see:

- Recommended queries for elements
- Interactive playground
- Better selector suggestions

---

### 4. **Find Elements Better** - Query Priority

Use queries in this order (best to worst):

```javascript
//  Best: Accessible to everyone
screen.getByRole('button', { name: /fetch user/i })
screen.getByLabelText(/email/i)
screen.getByText(/loading/i)

//  Semantic
screen.getByAltText(/user avatar/i)
screen.getByTitle(/close/i)

//  Test IDs (last resort)
screen.getByTestId('user-info')
```

**💡 See it in action:** Run `npm run test:debugging` - check TIP 8-10

---

### 5. **Async Debugging** - Use `findBy` instead of `getBy`

```javascript
//  BAD: getBy throws immediately if not found
const element = screen.getByText(/user data/i);

//  GOOD: findBy waits (returns Promise)
const element = await screen.findByText(/user data/i);
```

**Or use `waitFor`:**

```javascript
await waitFor(() => {
  expect(screen.getByText(/user data/i)).toBeInTheDocument();
});
```

**💡 See it in action:** Run `npm run test:debugging` - check TIP 4-5 for async timing

---

### 6. **Mock Inspection** - Check if mocks were called

```javascript
expect(axios.get).toHaveBeenCalledTimes(1);
expect(axios.get).toHaveBeenCalledWith('https://api.example.com/user/1');

// See all calls:
console.log(axios.get.mock.calls);
```

**💡 See it in action:** Run `npm run test:debugging` - check TIP 11

---

### 7. **Common Errors & Solutions**

| Error | Likely Cause | Fix |
| ------- | -------------- | ----- |
| `Unable to find element` | Wrong query, element not rendered yet | Use `findBy` or `waitFor`, check `screen.debug()` |
| `toBeInTheDocument is not a function` | Missing jest-dom setup | Import '@testing-library/jest-dom' in setupTests.js |
| `Cannot read property 'data'` | Mock not returning value | Add `.mockResolvedValue({ data: ... })` |
| `Test finished before assertion` | Missing `await` | Add `await` before async operations |
| `Network request failed` | Forgot to mock API call | Mock axios method with `jest.mock('axios')` |

---

## Presentation Flow

### Suggested Demo Script (15-20 minutes)

### 1. Introduction (2 min)

```text
"Today I'll show 5 common React testing mistakes and their one-line fixes.
We're using React Testing Library - the industry standard for testing React components."
```

### 2. Show the Component (2 min)

- Quickly walk through UserProfile.jsx
- Highlight: state, async call, loading/error states

### 3. Demo Each Broken Test (10 min)

For each test:

```bash
# Run the broken test
npm run test:broken1

# Show the error output
# Explain what's wrong
# Show the fix (one line)
# Re-run to show it passes
```

**Recommended order:**

1. Test 1 (typo)  - easiest, instant recognition
2. Test 2 (missing await)  - clear error, simple fix
3. Test 3 (missing mock)  - need to understand mocking
4. Test 4 (wrong data)  - data contract issues
5. Test 5 (forgot to mock)  - comprehensive mocking understanding

#### 4. Debug Tips (3-5 min)

Show debugging in action:

```bash
# Run the debugging demo during Q&A
npm run test:debugging
```

- Show `screen.debug()` and `screen.debug(undefined, Infinity)`
- Show `logRoles()` for finding elements
- Demonstrate query differences (query/get/find)
- Show async debugging with `waitFor`

#### Optional: Show Test Examples

If time permits or during Q&A:

```bash
npm run test:examples
```

Highlights:

- Critical path tests (happy path + error handling)
- Edge cases (null data, rapid clicks)
- Coverage examples
- Integration test (complete flow)

### 5. Best Practices Recap (2 min)

```text
 Always mock external dependencies
 Await async operations
 Match mock data to component expectations
 Use accessible queries (getByRole, getByLabelText)
 Test user behavior, not implementation
 Use screen.debug() when stuck
 Check console for helpful error messages
```

### 6. Q&A

---

## Additional Learning Resources

### New Test Files for Learning

This repo includes two additional test suites that demonstrate advanced concepts:

#### 1. **Test Examples** (`UserProfile.examples.js`)

Run with: `npm run test:examples`

Demonstrates:

- ✅ Critical path tests (P0 priority)
- ✅ Error handling scenarios
- ✅ Edge cases and boundary conditions
- ✅ Coverage best practices (line vs branch vs statement)
- ✅ Integration tests (complete user flows)
- ❌ Anti-patterns to avoid (commented)

**Use during presentation:**

- Show during Q&A when asked about "what else should I test?"
- Demonstrate different test priorities
- Explain coverage metrics

#### 2. **Debugging Tips** (`UserProfile.debugging.js`)

Run with: `npm run test:debugging --verbose`

Demonstrates:

- 🔍 `screen.debug()` variations
- 🔍 `logRoles()` for element discovery
- 🔍 Async timing issue debugging
- 🔍 Query differences (queryBy/getBy/findBy)
- 🔍 Event handler verification
- 🔍 Custom debug helpers
- 🔍 Accessibility checks

**Use during presentation:**

- Run live during debugging section
- Show console output to audience
- Demonstrate real debugging workflow

### Reference Documents

- **[TEST-EXAMPLES.md](TEST-EXAMPLES.md)** - Comprehensive guide to meaningful test scenarios
- **[DEBUGGING-TIPS.md](DEBUGGING-TIPS.md)** - Complete debugging reference with examples
- **[PRESENTATION.md](PRESENTATION.md)** - Detailed presentation script and talking points

---

## Common Testing Pitfalls

### 1. **Testing Implementation Details**

```javascript
//  BAD: Testing internal state
expect(component.state.loading).toBe(true);

//  GOOD: Testing what users see
expect(screen.getByText(/loading/i)).toBeInTheDocument();
```

### 2. **Not Cleaning Up**

```javascript
//  Always clean mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 3. **Synchronous Tests for Async Code**

```javascript
//  BAD: No await
fireEvent.click(button);
expect(screen.getByText(/user data/i)).toBeInTheDocument();

//  GOOD: Await state changes
fireEvent.click(button);
await screen.findByText(/user data/i);
```

### 4. **Over-Mocking**

```javascript
//  BAD: Mocking everything, even component logic
jest.mock('../UserProfile', () => ({ ... }));

//  GOOD: Only mock external dependencies
jest.mock('axios');
```

### 5. **Not Testing Error States**

```javascript
//  Always test:
// - Success case
// - Loading state
// - Error state
// - Edge cases (empty data, null, etc.)
```

---

## Reference Links

- [React Testing Library Docs](https://testing-library.com/react)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/)

---

## Key Takeaways

1. **Component tests strike the best balance** for frontend development
2. **Always mock external dependencies** (APIs, modules)
3. **Await async operations** - don't let tests finish too early
4. **Match mock data to component expectations**
5. **Use `screen.debug()` liberally** when debugging
6. **Test behavior, not implementation**
7. **Write tests that resemble how users interact** with your app

---

## Bonus: Quick Reference Card

```javascript
// RENDER
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
render(<Component />);

// QUERIES (in priority order)
screen.getByRole('button', { name: /click me/i })
screen.getByLabelText(/email/i)
screen.getByText(/hello/i)
screen.getByTestId('my-element')

// ASYNC QUERIES
await screen.findByText(/loaded/i)  // Waits up to 1000ms
await waitFor(() => expect(...))    // Custom waiting

// INTERACTIONS
fireEvent.click(button)
fireEvent.change(input, { target: { value: 'text' } })

// ASSERTIONS (jest-dom)
expect(element).toBeInTheDocument()
expect(element).toHaveTextContent(/hello/i)
expect(element).toBeDisabled()
expect(element).toBeVisible()

// MOCKING AXIOS
jest.mock('axios')
axios.get.mockResolvedValue({ data: {...} })
axios.get.mockRejectedValue(new Error('fail'))

// DEBUGGING
screen.debug()                        // Show DOM
screen.debug(undefined, Infinity)     // Show full DOM (no truncation)
screen.logTestingPlaygroundURL()      // Interactive playground
```

---

**Good luck with your FE Day presentation!**

Questions? Check the fixed tests in `UserProfile.tests.fixed.js` for reference.
