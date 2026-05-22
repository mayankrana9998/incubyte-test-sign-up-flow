# ParaBank Sign-Up Flow Automation

This repository contains a **BDD + POM** UI automation flow for ParaBank:
- Register a new user
- Log in with created credentials
- Print the first account amount displayed after login

## Stack
- Playwright
- Cucumber (BDD)
- TypeScript

## Run
```bash
npm install
npx playwright install
npm run test:bdd
```

## Structure
- `features/` – Gherkin feature files
- `step-definitions/` – BDD step implementations
- `pages/` – Page Object Model classes
- `utils/` – data builders/helpers
- `test-cases.xls` – documented test cases
