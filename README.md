# ParaBank Sign-Up Flow Automation

This repository contains a **BDD + POM** UI automation test suite for the ParaBank website sign-up and login flow.

## Objective
Automate creating an account on https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC and signing in with that account, then capturing and logging the post-login account amount.

## Test Scenario
**Scenario**: Register, sign in, and log account balance
- **Given**: User is on ParaBank home page  
- **When**: User registers a brand new ParaBank user
- **And**: User signs in with the created user (auto-login after registration)
- **Then**: User should see the Accounts Overview page
- **And**: User can see and log the displayed account amount

## Technology Stack
- **Framework**: Playwright
- **Test Language**: Cucumber (BDD with Gherkin syntax)
- **Language**: TypeScript
- **Architecture**: Page Object Model (POM)

## Project Structure
```
.
├── features/
│   └── signup-login.feature        # BDD scenarios in Gherkin
├── pages/
│   ├── RegisterPage.ts             # Page Object for registration
│   └── LoginPage.ts                # Page Object for login & verification
├── step-definitions/
│   └── signup-login.steps.ts       # Step implementations
├── utils/
│   └── testDataFactory.ts          # Test data generation
├── test-cases.xls                  # Test cases documentation
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config
└── README.md                       # This file
```

## Test Cases Documentation
See [test-cases.xls](./test-cases.xls) for detailed test case documentation including:
- **TC_001**: Register valid new user
- **TC_002**: Login with newly created user  
- **TC_003**: Capture post-login amount

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm (v8+)

### Install Dependencies
```bash
npm install
npx playwright install
```

## Running Tests

### Run All BDD Tests
```bash
npm run test:bdd
```

### Expected Output
```
Feature: ParaBank account sign-up and login
  Scenario: Register, sign in, and log account balance
    ✓ Given I open the ParaBank home page
    ✓ When I register a brand new ParaBank user
    ✓ And I sign in with the created user
    ✓ Then I should see the Accounts Overview page
    ✓ And I log the displayed account amount

1 scenario (1 passed)
5 steps (5 passed)
Post-login displayed account amount: $515.50
```

## Page Object Model Details

### RegisterPage
- `open()` - Navigate to ParaBank home page
- `openRegistrationForm()` - Click on Register link
- `register(user)` - Fill registration form and submit

### LoginPage
- `login(username, password)` - Fill login credentials and submit
- `assertOverviewVisible()` - Verify Accounts Overview page loads
- `readFirstAccountAmount()` - Extract account balance from table

## Test Data
User data is automatically generated with:
- Random username and SSN
- Unique last name based on timestamp
- Fixed address, city, state for consistency
- Random 9-digit SSN for each test run

## Key Features
✅ BDD with Gherkin syntax for readable test scenarios  
✅ Page Object Model for maintainable test code  
✅ Automatic test data generation for each run  
✅ Proper waits and load state checks  
✅ Error handling and detailed logging  
✅ Non-headless mode for debugging (can be toggled)  

## Proof of Execution
The automation successfully:
1. Creates a new user account on ParaBank
2. Automatically logs in after registration
3. Navigates to Accounts Overview page
4. Reads and logs the account balance (e.g., `$515.50`)

All 5 test steps pass consistently.

## Browser Testing
Tests are configured to run with Chromium browser in non-headless mode for visibility during development. This can be changed in `step-definitions/signup-login.steps.ts` by setting `headless: true`.

## Notes
- Registration automatically logs in the user (no separate login step needed)
- Account data is pre-populated for new registered users
- Tests use meaningful waits and proper page load verification
- All selectors are tested and verified against the actual ParaBank website

