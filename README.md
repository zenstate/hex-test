# HEX Frontend Task

A submission against https://github.com/holidayextras/recruitment-tasks/blob/master/developer-flickr-task.md

This SPA is designed to pull data from the flickr public stream

## Quick Start

This project is a monorepo containing two sub projects
- site - The clientside and serverside code for the project.
- uiTests - A puppeteer based set of ui tests.

This project requires node.js v13 to run.

This project uses [lerna](https://lerna.js.org/) to manage its the dependencies for the project.  To get a development version of the project, run the following 

```bash
git clone git@github.com:zenstate/hex-task.git
cd hex-task
lerna bootstrap
lerna run dev
```

If you do not have lerna installed locally, run the following;

```bash
git clone git@github.com:zenstate/hex-task.git
cd hex-task/packages/site
yarn install
yarn dev
```

## Building for production

To build a production ready version of this project

```bash
lerna run build
lerna run start
```

## Running tests

### Unit tests

To run the unit tests for this project run 

```bash
lerna run test --stream
// Without lerna
cd packages/site
yarn test
```

### UI tests

To run the UI tests for this project run, first ensure that the frontend is built and running

```bash
lerna run build
lerna run start
// without lerna
cd packages/site
yarn build
yarn start
```

Then you can run the ui tests

```bash
lerna run test:ui --stream
// without lerna
cd packages/uiTests
yarn test:ui
```

### TODO

- Add infinite loading stream.
- Improve fallback for error handling with images.
- Add progressive loading images.
- Improve CSS size (remove bootstrap mono css, switch to only required scss.)
- Mock out the flickr API to allow better integration testing.
- Improve the NSFW filters (the flickr REST API should default to safe, but it is relying on user tags.)