# Quick TDD intro using TypeScript

Quick workshop to get started with TDD and
simple design using TypeScript. 

## Instructions

There is no implementation code left in the main branch, just the tests are there. However, tests are ignored (.skip). You will have to create a file Hangman.ts and implement the minimum and simplest code to make each test pass, one by one.

You probably want to disable Copilot or any other AI plugin to be able to practice TDD. Otherwise, given the clarity of the test names and the expressiveness of the API, the AI will generate all the implementation at once. 

* Unignore/enable the first test. Run the test to see it fail (remove .skip from it).
* Write the minimum implementation, the fastest one to make it green.
* Run the test to see it pass.
* See if you want to refactor a bit.
* Go for the next test and keep going. If you enable a test, run it, and it's green, that could mean that you wrote too much code for the previous test. On the other hand, it could be that your implementation is enough but slightly different - maybe it's all right. 
* Take a moment to think if you wrote more code than strictly necessary. If so, go back one step, delete code, and try a simpler implementation. Each new test should turn red, not green, until you explicitly write enough code to make it green. 
* You may try to remove or comment some lines of the production code you just wrote and run the test. If the tests pass, you wrote more code than needed. 
* If you find that a test is redundant, delete it. 
* If you need to add more tests, add them, following the TDD cycle:
* Given that the implementation is minimal to make each test pass, you may encounter that the production code is not complete, even if all tests are passing. If the code is missing a more general case, please add more tests to reveal the defect or the incompletion and make it pass, following the TDD flow. Notice that, rather than adding new tests, you may want to change an existing test with the exact case that is missing. The name of the tests will tell you whether you need more tests or whether you may change existing tests. 
* When all tests are passing and no more tests are needed, it may be a good time to refactor towards sustainable code. Apply the necessary design principles to keep the design simple, obvious, explicit and open to future changes.
* You may commit your changes after each green test to track your progress.  
* If you practise this exercise in groups, compare the final implementation with other people's solutions. Notice how similar it is and what are the differences. Discuss why and how you reach to that point. 
* Take a look at the various branches of this repository to explore other solutions and study the differences with your implementation.

## Bonus I

Test-drive more features: There could be two or more human players for each game. Add others you want to. Remember, always write a test first. 

## Bonus II

The artifacts created to make all the tests pass belong in the core domain logic. There is no UI here and no database. You could consider adding a GUI and perhaps some storage. First, try using the plain old document API, avoiding the use of frameworks and libraries like React or Angular. You could design your own frontend architecture, implementing patterns such as Passive View, Model View Presenter, or any other. In a different branch, you may want to develop the frontend with React, Angular, Vue, or whatever you prefer. Make sure you practice TDD all along. Everything should be well tested.


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
