# Record Source Pushing To Endpoint

> Uses MSW to mock the server [MSW](https://mswjs.io/docs/getting-started)
> Mixes it with `vi.fn()` to provide dynamic mocking of the server and inspect requests

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

## Exercise (record-source-push-3)

Using the data inside `./data/posts.json` as an example, along with any other data you wish to
use, write the conversion function `convertServerPosts` test first.

Remember the spec:

- We select the first post
- `who` is the userId field from the post, prefixed with `userId = `
- `subject` is the `title` field from the post
- `summary` is the `body` of the post, truncated to 10 characters
- `count` is the size of the response array

Example code in `record-source-push-3`

[linktree](https://linktr.ee/ashleyfriezetdd)
[GitHub](https://github.com/ashleyfrieze/easy-tdd-typescript)