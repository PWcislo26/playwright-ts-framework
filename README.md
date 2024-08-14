# playwright-ts-framework

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Continuous Integration](#continuous-integration)

## Introduction

This repository contains an automation testing suite using [Playwright](https://playwright.dev/) with TypeScript. This is my first time ever using Playwright framework and Typescript programming language.

## Project Structure

 * [config](config) - test data and mock objects
 * [fixtures](fixtures) - test fixtures
 * [page-objects](page-objects) - Page Object Models
    * [components](components) - Components that complement POMs
 * [tests](tests) - Test files

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PWcislo26/playwright-ts-framework.git
   cd playwright-ts-framework
   ```
2. **Install dependencies:**

    ```bash
    npm install
   ```
3. **Install Playwright Browsers:**

    ```bash
    npx playwright install
    ```
## Running tests

 Configure the testing environment by editing the `playwright.config.ts` file. You can set different options like browser, test directory, timeout, etc.

 ## Running Tests

To execute the tests in this project, use the following commands:

1. **Run all tests:**

   ```bash
   npx playwright test
   ```
   This command will run all the tests located in the `/tests/` directory.
2. **Run specific test:**

   ```bash
   npx playwright test tests/example.spec.ts
   ```
   Replace `example.spec.ts` with the name of the test file you wish to run.
3. **Generate and view HTML report:**

   ```bash
    npx playwright show-report
   ```
   This will open a detailed HTML report of the test results, showing passed and failed tests, as well as logs and screenshots.

## Continuous Integration

This project includes a GitHub Actions workflow for continuous integration. You can manually trigger the test suite using the workflow dispatch feature. The workflow is defined in the `.github/workflows` directory.

To manually trigger the workflow:

1. Go to the Actions tab in your GitHub repository.
2. Select the Playwright Tests workflow.
3. Click on the "Run workflow" button.
4. Choose the branch you want to run the tests on and click "Run workflow".