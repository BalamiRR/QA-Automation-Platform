# Playwright Cucumber TypeScript Project

This project uses **Playwright** for browser automation, **Cucumber** for BDD testing, and **TypeScript** for type safety.

✅ **1 Test Passed** | 4 Steps Passed | Ready for CI/CD

## 📋 Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## ▶️ Running Tests

### Run all tests:
```bash
npm test
```

### Run with test report:
```bash
npm run report
```

### Run and view Allure report:
```bash
npm run allure
```

## 📊 View Test Reports

### Cucumber HTML Report:
```bash
# After running: npm test
# Open: reports/cucumber-report.html
```

### Allure Report (with metrics):
```bash
# Step 1: Run tests
npm test

# Step 2: Generate Allure report
npm run process

# Step 3: View in browser
npm run serve

**Or use the quick command:**
```bash
npm run allure
```
http://127.0.0.1:55890/


## 📁 Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed information.

## ✨ Features

- ✅ **User Registration Scenario** on https://practice.expandtesting.com/register
- ✅ **Page Object Model** for clean code organization
- ✅ **TypeScript** for type safety
- ✅ **Allure Reports** for detailed test metrics
- ✅ **VS Code Integration** with Ctrl+Click navigation
- ✅ **CI/CD Ready** with JSON output

## 🧪 Current Test Coverage

| Test Case | Status | Steps | Report |
|-----------|--------|-------|--------|
| User Registration (Successful) | ✅ PASSED | 4 | [View](reports/allure-report/index.html) |