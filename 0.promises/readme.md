Promises are objects that represent the eventual completion (or failed) of an asynchronous operation.

There are three states: pending, resolved or rejected.

Methods to work with a Promise state:

- `.then` - handles a Resolved Promise
- `.catch` - handles a Rejected Promise
- `.finally` - Runs regardless of wether the Promise is resolved or ejected. Useful for cleanp tasks,
- `Promise.resolve(value)` - A promise that is immediately resoved with the given value.
- `Promise.reject(reason)` - A promise that is immediately rejected with a given reason.