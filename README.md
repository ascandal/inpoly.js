# inpoly.js — Geometric Overlap & Range Queries

A small JavaScript library and example app for spatial queries, focused on summing values for points that fall within an axis‑aligned rectangle, with options for preprocessing and method of choice. The code is written in JavaScript for rapid iteration.

---

## Overview

This project provides:

- **Baseline scan** for `sumOfPointsInRectangle` with time complexity **O(n)** and memory complexity **O(1)**.
- **Optional fast‑reject** using a **bounding rectangle** of all points to quickly test overlap with a query rectangle.
- **Preprocessing options** to narrow candidate points (sorting + binary search, subgridding).
- **KD‑tree acceleration** via [`static-kdtree`](https://www.npmjs.com/package/static-kdtree) for efficient range queries.

---

## Implementation Notes

- **Language choice.** Although implemented in JavaScript, the same approach can be ported to C++ (with explicit casts and strong typing) without loss of generality.

- **Input shape for `sumOfPointsInRectangle`.** Some interfaces expect an **array of doubles**; this implementation currently accepts an **array of `Point` objects**. If desired, an additional routine can be added to accept an array of doubles for parity with those interfaces.

- **Complexity of the baseline method.** The non‑optimized `sumOfPointsInRectangle` runs in **O(n)** time and **O(1)** extra memory.

- **Type considerations.** JavaScript is not statically typed and uses floating‑point numbers for numeric values; a C++ implementation can use appropriate numeric types and casting for type safety.

### Preprocessing & Optimization Strategies

- **Bounding rectangle:**
    - Compute the bounding rectangle of all points once and use it to quickly check **overlap** with each query rectangle. This is implemented as an optional parameter to `sumOfPointsInRectangle`.

- **Sorting + binary search:**
    - Sort the array in one or both coordinate directions (e.g., **MergeSort**) and use binary search (e.g. **MergeSearch**) to narrow the index range of candidate points for a query rectangle.
    - While this can yield time complexity **O(log n)** in 1D with a slight increase in memory, due to binary search, the worst‑case behavior for 2D often remains **O(n)**, so overall gains can be modest.

- **Subgridding:**
    - Partition the rectangle into subgrids to exploit clustered point distributions and reduce per‑query candidate sets.

- **KD‑tree range search:**
    - Use a KD‑tree for orthogonal range queries. Theoretical performance is **O(d·n^(1−1/d))**, where _d_ is the dimension. This project demonstrates the approach using the npm package [`static-kdtree`](https://www.npmjs.com/package/static-kdtree) in `sumOfPreprocessedPointsInRectangle`.
    - For best memory performance, construct the KD‑tree directly from the underlying numeric array layout (e.g., an array of doubles) to avoid intermediate object conversions.

---

## Install

Clone the GitHub repository:

```bash
git clone git@github.com:ascandal/inpoly.js.git
cd inpoly.js
```

Install dependencies:

```bash
npm install
```

---

## Development

The environment was set up using [`create-react-library`](https://github.com/transitive-bullshit/create-react-library#readme). Requires `node >= 4`, but `node >= 8` is recommended.

1. **Build App** — runs **Rollup** to watch `src/` and bundles distribution in `dist/`:

```bash
npm run start
```

2. **Run App** — runs the `example/` React App, linked to the local build:

In a new terminal window:

```bash
# (in another tab)
cd example
npm run start
```

Any changes to `src/` or `example/src` will trigger live reload in the dev server.

---

## Test

Run unit and functional tests:

```bash
npm run test
```

---

## License

[MIT License](LICENSE). © [ascandal](https://github.com/ascandal)
