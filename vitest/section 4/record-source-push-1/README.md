# Record Source Pushing To Endpoint

> Demonstrating the need for mocks.

When we create records, we provide metadata about the source.

- Deployed Environment Name
- Machine Name
- Debug flag driven extra data - process.env.LANG
- Timestamp of event

We want to be able to pull the list of posts from https://jsonplaceholder.typicode.com/posts,
and take the first item and count, to send them to https://trackposts.com where the item is
reformatted:

```json
{
    "senderMetadata": { our metadata ... },
    "who": "userId = 1",
    "subject": "Contents of title",
    "summary": "First 10 characters of the body",
    "count": 12,
}
```

## Exercise (record-source-push-1)

Write a test using `vi.fn()` to mock the fetcher and the sender within `record-job.ts` and assert that
whatever was returned by the fetcher is sent to the sender.

Recall:

- `expect(mock).toHaveBeenCalledWith(expect.objectContaining({ +++values++ }))`
- `const mockSomething = vn.fn(() => Promise.resolve({value: 'something'}))`

[linktree](https://linktr.ee/ashleyfriezetdd)
[GitHub](https://github.com/ashleyfrieze/easy-tdd-typescript)