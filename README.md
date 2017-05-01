# markdown-exercises
A tool for writing javascript exercises in Markdown with embedded assertions as code snippets

# Example

Given a markdown file like this

```md
# Plus 2

Write a function that given an input number it returns that number plus 2

``js
expect(solution(3)).to.deep.equal(5)
``

```

(instead of 2 backticks it should be 3 backticks, this is only because this file is also a markdown !)

And a file

Plus-2.js
```js
export default function(a) {
  return a + 2
}
```

It checks the solution agains the expectation by running a test like this

```bash
  Root
    Plus 2
      ✓ test #1


  1 passing (1s)

✨  Done in 1.38s.
```
