# UUIDv7

UUIDv7 generator based on the [RFC4122 update proposal (draft-03)](https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-03.html)

[![npm (scoped)](https://img.shields.io/npm/v/@kripod/uuidv7)](https://www.npmjs.com/package/@kripod/uuidv7)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@kripod/uuidv7)](https://bundlephobia.com/package/@kripod/uuidv7)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/kripod/uuidv7/Node.js%20CI/main)](https://github.com/kripod/uuidv7/actions/workflows/node-ci.yaml)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./CODE_OF_CONDUCT.md)

## Usage

```js
import { uuidv7 } from "@kripod/uuidv7";

let id = uuidv7();
console.log(id); // Example: 03475b12-c000-7000-8b18-6150ad2d0c05
```

## Key features

- K-sortable with 1ms precision _(Safari disallows sub-ms timing [to defend against Spectre](https://webkit.org/blog/8048/what-spectre-and-meltdown-mean-for-webkit/))_
- Time-ordered when sorted lexicographically
- Collision-resistant with distributed systems in mind
- Works until the year 10889, after which timestamps would overflow

## Compatibility

| Chrome | Safari | Firefox |         IE          | Node.js | Deno |
| :----: | :----: | :-----: | :-----------------: | :-----: | :--: |
|  ≥57   |  ≥10   |   ≥48   | No _(polyfillable)_ |   ≥8    |  ≥1  |

### Supporting additional runtimes

- [`String.prototype.padStart`](https://caniuse.com/pad-start-end)

  - Included in popular frameworks:

    - Next.js
    - Nuxt
    - Gatsby

  - Polyfillable using [core-js](https://github.com/zloirock/core-js), preferably [within `<script nomodule>`](https://3perf.com/blog/polyfills/#modulenomodule):

    ```js
    import "core-js/features/string/pad-start";
    ```

- [`crypto.getRandomValues()`](https://caniuse.com/getrandomvalues)

  - IE 11:

    ```js
    if (typeof window !== "undefined" && !window.crypto && window.msCrypto) {
      window.crypto = window.msCrypto;
    }
    ```

## Binary structure

- `unixts`: Unix timestamp – 36 bits
- `msec`: Milliseconds – 12 bits
- `ver`: UUID version (`7`) – 4 bits
- `seq`: Monotonic sequence counter for more precise sorting – 12 bits
- `var`: UUID variant (`0b10`) – 2 bits
- `rand`: Cryptographically strong random data – 62 bits

<div aria-hidden="true">

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┐
│                            unixts                             │
├─┴─┴─┴─┼─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┼─┴─┴─┴─┼─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│unixts │         msec          │  ver  │          seq          │
├─┴─┼─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│var│                         rand                              │
├─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│                             rand                              │
└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
```

</div>
