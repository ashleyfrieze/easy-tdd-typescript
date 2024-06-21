# TDD in Brief

With example code in [EasyTDD TypeScript on GitHub](https://github.com/ashleyfrieze/easy-tdd-typescript).

## Philosophy

- Write test before code
- Work incrementally
- Use a checklist to keep track of current and future increments

### Why?

- Focusing on behaviour before writing code helps us focus on the outcome we want
- Focusing on achieving incremental meaningful outcomes helps write only code we need
- Locking the behaviour in the grip of a test that will show if it stops working helps us protect the value in our system
- Experimenting with code, driven by tests, is quicker than trying to get it perfect first time
- It's easy and safe to refactor
- Writing tests that focus on meaningful outcomes, avoids the tests getting broken by valid refactorings
- We need to spend less time manually testing and debugging our code
- We can built the testing into our deployment pipelines to give us strong assurance that we're maintaining quality

## Structure

- Code goes in a test fixture
  - Test fixtures allow common set up and clean up for a set of tests
- Grouped by subject matter
- Individual test cases
  - Given / When / Then structure
  - End in an assertion

## Vitest

[Vitest Docs](https://vitest.dev/guide/)

- `describe` for a block of tests (can be nested)
- `it` to describe a test case
- `test` is an alternative to `it`
- `beforeAll`, `beforeEach` - prepare before tests
- `afterAll`, `afterEach` - clean up after tests
- `expect` - a function to create an assertion on something
  - `expect(result).toBe(value)` - basic assertion on exact equality
  - `expect(result).toBeTruthy()`, `.toBeFalsy()` - assertions at a higher level
  - `expect(result).toMatchObject({...})` - selective assertion
  - Selective assertions can also use embedded functions from `expect` - e.g. `expect(result).toMatchObject({field: expect.objectContaining({foo: true})})`
- `vi.fn()` - a generic mock/spy - can be instructed to perform as any function and records calls
  - Don't forget `vi.restoreAllMocks()` in between tests
  - `expect(mock).toHaveBeenCalled()` - to see if it was called
  - `expect(mock).toHaveBeenCalledTime(3)` - to count invocations
  - `expect(mock).toHaveBeenCalledWith(...)` - assert the parameters used on a spy
  - `vi.fn(() => {... })` - provide initial mock implementation
  - `mock.mockImplementation(() => {...})` - provide a function to mock the behaviour
  - `mock.mockReturnValue(..)`/`mock.mockReturnValueOnce(...)` - to make a mock return something
  - `mock.mockResolvedValue(...)` - as above but for promises
- `vi.mock('module/path', () => ({ ... substitute for module ...  }))` - replace a module with a mock alternative
  - `vi.mocked(importedFunction)` - convert the import of the function into a `MockedFunction` which has the interface of the imported function, but ALSO the interface of a `vi.fn()` so we can assert with it

## MSW

[MSW](https://mswjs.io/)

Can intercept all calls made to `axios` or `fetch` allowing us to fake a web service.

- Uses handlers
  - `http.get('https://some-url', () => {... function that returns a response })`
- Create a server with the handlers
  - `const server = setupServer(...handlers)` - the handlers are spread into the function
- Start the server listening before all tests and close it at the end
  - `beforeAll(() => server.listen());`
  - `afterAll(() => server.close());`
- Use `vi.fn()` within a handler to capture or vary response of the server

## User Interface Testing

[Testing Library](https://testing-library.com/)

- Set up tests with a fake DOM
- Render components into the DOM
- Simulate user events if necessary
- Assert on elements found in the DOM using attributes or roles
- Modularise user interface code to make it easy to test components in isolation
