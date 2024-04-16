Hosted App link - [link]()

# Run Test Cases Procedure

## 1. Prerequisites

Before running the tests, ensure you have the following prerequisites installed:

- Node.js and npm
- Angular CLI (`npm install -g @angular/cli`)
- Cloned this GitHub Repo

## 2. Run Commands

### I. Run Tests for the Full Project
To run tests for the entire project, execute the following command:

```bash
ng test
```

### II. Run Tests for a Specific File
To run tests for a specific file (e.g., app.component.spec.ts), use the following command:

```bash
ng test --include=src/app/app.component.spec.ts
```

### III. Open test results in browser
It will popup automatically in browser (host port might be different in your case).

```bash
open http://localhost:9876/
```
Sample Report

 ![karma]()

## 3. Check Coverage Report 

### I. Check Coverage for the Full Project
To check the code coverage for the entire project, run:

```bash
ng test --code-coverage
```

### II. Check Coverage for a Specific File
To check code coverage for a specific file (e.g., app.component.spec.ts), use:

```bash
ng test --include=src/app/app.component.spec.ts --code-coverage
```

### III. View Coverage Details
After running the coverage command, navigate to the `fyle-frontend-challenge-23/coverage/fyle-frontend-challenge/app` folder. Open `index.html` in your browser to view the coverage percentage and details.

Sample Reports


 ![instanbul]()
 ![instanbul_2]()

## 3. Documentation for Angular Test
For more help visit official angular CLI documentation website
[Test Documentation](https://angular.io/cli/test)





# Fyle Frontend Challenge

## Who is this for?

This challenge is meant for candidates who wish to intern at Fyle and work with our engineering team. The candidate should be able to commit to at least 6 months of dedicated time for internship.

## Why work at Fyle?

Fyle is a fast-growing Expense Management SaaS product. We are ~40 strong engineering team at the moment. 

We are an extremely transparent organization. Check out our [careers page](https://careers.fylehq.com) that will give you a glimpse of what it is like to work at Fyle. Also, check out our Glassdoor reviews [here](https://www.glassdoor.co.in/Reviews/Fyle-Reviews-E1723235.htm). You can read stories from our teammates [here](https://stories.fylehq.com).

## Challenge outline

This challenge involves implementing application using github api. 

The services that you need to use are already implemented - check out ApiService.

You can see details of this challenge [here](https://fyleuniverse.notion.site/fyleuniverse/Fyle-Frontend-development-challenge-cb5085e5e0864e769e7b98c694400aaa)

__Note__ - This challenge is in angular. We work on angular frameworks & after you join we expect the same from you. Hence it is required to complete this assignement in angular itself.

## What happens next?

You will hear back within 48 hours from us via email.

## Installation

1. Fork this repository to your github account.
2. Clone the forked repository and proceed with steps mentioned below.

### Install requirements
* Install angular cli [Ref](https://angular.io/cli)
* `npm install` in this repository 

## Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Further help

Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.
Styling is to be strictly done with [Tailwind](https://tailwindcss.com/docs/installation).