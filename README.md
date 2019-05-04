# divergent3d-coding-test

> Coding test for Divergent3D interview.

[![NPM](https://img.shields.io/npm/v/divergent3d-coding-test.svg)](https://www.npmjs.com/package/divergent3d-coding-test) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
