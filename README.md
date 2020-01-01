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
git clone git@github.com:zenstate/hex-frontend-task.git
cd hex-frontend-task
lerna bootstrap
lerna run dev
```

If you do not have lerna installed locally, run the following;

```bash
git clone git@github.com:zenstate/hex-frontend-task.git
cd hex-frontend-task/packages/site
yarn install
yarn dev
```

## Running tests

### Unit tests

To run the unit tests for this project run 

```bash
lerna run test --stream
```

### UI tests

To run the UI tests for this project run

```bash
lerna run test:ui --stream
```