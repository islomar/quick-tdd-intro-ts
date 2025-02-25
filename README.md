# Quick TDD intro using TypeScript

Quick workshop to get started with TDD and
simple design using TypeScript. 

## Instructions

There is no implementation code left in the main branch, just the tests are there. However, tests are ignored (.skip). You will have to create a file Hangman.ts and implement the minimun and simplest code to make each test pass. One by one.

You probably want to disable Copilot or any other AI plugin to be able to practise TDD. Otherwise, given the clarity of the test names and the expresivity of the API, the AI will generate all the implementation in a single shot. 

* Unignore/enable the first test. Run the test to see it fail. (remove .skip from it) 
* Write the minium implementation the fastest one to make it green. 
* Run the test to see it pass.
* See if you want to refactoring a bit.
* Go for the next test and keep going. If you enable a test, run it and it's green, that could mean that you wrote too much code fo the previous test. Go back one step, delete code and try a more simple implementation. Each new test should turn red, not green, until you explicitely write enough code to make it green.
* You could commit your changes after each green test to track your progress.  


## Setup

Node v22 is required to run this project.

> 💡If you don't have it installed, we recommend the use of a version manager
> like [_nvm_](https://github.com/nvm-sh/nvm) or [_fnm_](https://github.com/Schniz/fnm) (a cross-platform alternative to
> _nvm_). After installing the manager, you can install the Node version by running: `nvm use` or `fnm use`.

Once you have Node installed, you can install the project dependencies by running:

`npm install`

### Plugins

This project uses the following plugins:

- [Vitest](https://vitest.dev/), a blazing fast test framework.

> ℹ️ If VSCode is your editor of choice, you can install the recommended extensions.

## Run tests

You can run the tests by running:

`npm run test`

If you want to run the tests in watch mode, you can run:

`npm run test:watch`

Also, you can run the tests with coverage by running:

`npm run test:coverage`
