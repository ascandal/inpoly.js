# divergent3d-coding-test

> Coding test for Divergent3D interview.

[![NPM](https://img.shields.io/npm/v/divergent3d-coding-test.svg)](https://www.npmjs.com/package/divergent3d-coding-test) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Notes for Interviewer

- I am aware and feel as if I should have done this proplem using c++ instead of Javascript. I proceeded with javascript since I had the testing and development environment setup right at the start of the test time. However, I see no issues with implementing the same code in c++.

- Part 2 asks for an `array of doubles` as input to `sumOfPointsInRectangle`. However I implemented it using an `array of Points`. An additional routine can be added to accept `array of doubles` for additional functionality if need be.

 - The non-optimized `sumOfPointsInRectangle` has time complexity `O(n)` and memory complexity `O(1)`.

 - Since Javascript is not type-safe, some of the issues were removed when using `double` or `int` point coordinates. However this can be safely implemented in c++ using type casting.

- Part 3. To preprocess the input `array of doubles`.

  - We can calculate the bounding rectangle of all the points in the array. Then the bounding rectangle can be used to quickly check for overlay with the base rectangle. This is implemented as an optional parameter to the `sumOfPointsInRectangle` method.

  - The array can also first be sorted (e.g. using MergeSort) in one or both coordinate directions (one array for each sort direction). Then `sumOfPreprocessedPointsInRectangle` could use a binary search (e.g. MergeSearch) to narrow down the range of indices of points that are in the rectangle.

    - This could give a time complexity of O(log n) but with a slight increase in memory complexity due to the binary search.

  - A kd-tree range search method would seem to be the most appropriate. This type of search method Performs in time complexity O(log n).

  - A sub gridding method to break down the ractangle into sections could also give a time performance boost if the point distribution is clustered in certain sections.



## Install

Clone the github repository.

```bash
git clone git@github.com:ascandal/divergent3d-coding-test.git
```

Change directories into the repository root directory.

```bash
cd divergent3d-coding-test
```

Install the dependencies.

```bash
npm install --save divergent3d-coding-test
```

## Development

This development environment was setup useing [create-react-library](https://github.com/transitive-bullshit/create-react-library#readme). This package requires `node >= 4`, but we recommend `node >= 8`.

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch the `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

## Test

To run the unit and functional tests.

```bash
npm run test
```

## License

[MIT License](LICENSE). © [ascandal](https://github.com/ascandal)
