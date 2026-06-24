# Playwright Cucumber TypeScript Project

This project uses Playwright for browser automation, Cucumber for BDD testing, and TypeScript for type safety.

## 📁 Project Structure

```
playwright-practice/
├── src/                           # Source code
│   ├── pages/                     # Page Object Model classes
│   │   └── RegisterPage.ts
│   ├── steps/                     # Cucumber step definitions
│   │   └── register.steps.ts
│   └── support/                   # Support utilities and hooks
│       └── hooks.ts
├── tests/                         # Test artifacts
│   └── features/                  # Gherkin feature files
│       └── register.feature
├── reports/                       # Generated reports
│   ├── cucumber-report.html       # Cucumber HTML report
│   └── allure-results/            # Allure test results
├── .vscode/                       # VS Code configuration
│   ├── settings.json              # IDE settings
│   ├── extensions.json            # Recommended extensions
│   └── launch.json                # Debug configurations
├── cucumber.js                    # Cucumber configuration
├── tsconfig.json                  # TypeScript configuration
├── playwright.config.js           # Playwright configuration
└── package.json                   # Project dependencies
```

## 🚀 Setup

1. **Install dependencies:** 
   ```bash
   npm install
   ```

2. **Install browsers:** 
   ```bash
   npx playwright install
   ```

## ▶️ Running Tests

### Run all tests:
```bash
npm test
```

### Run with test watcher:
```bash
npm test -- --tags @smoke
```

## 📊 Viewing Reports

### Cucumber HTML Report:
```bash
# Open reports/cucumber-report.html in your browser
```

### Allure Report:
```bash
# Generate Allure report from results
npx allure generate reports/allure-results -o reports/allure-report --clean

# View the report
npx allure serve reports/allure-results
```

## ✨ Project Features

### **Page Object Model (POM)**
- Clean separation of test logic and page interactions
- Located in: `src/pages/`
- Example: `RegisterPage.ts`

### **Step Definitions**
- Cucumber step implementations
- Located in: `src/steps/`
- Easy to navigate with **Ctrl+Click** in VS Code

### **Hooks**
- Setup and teardown logic
- Located in: `src/support/`

### **Feature Files**
- BDD scenarios in Gherkin syntax
- Located in: `tests/features/`
- Easy to maintain and understand

## 🔧 VS Code Integration

### Recommended Extensions:
- **Cucumber (Official)** - Official Cucumber support
- **Cucumber Autocomplete** - Smart autocomplete for steps

### Features:
- ✅ Click on steps with **Ctrl+Click** to jump to definitions
- ✅ Autocomplete suggestions for step names
- ✅ Syntax highlighting for `.feature` files
- ✅ Debug support for tests

## 📝 TypeScript Configuration

TypeScript is configured with:
- ES2020 target
- CommonJS module system
- Strict null checks disabled for easier testing
- Full Node.js type support

## 🔄 Continuous Integration

The project is ready for CI/CD pipelines:
- HTML reports for easy viewing
- Allure reports for detailed test metrics
- JSON output for CI systems integration

## 📚 Test Examples

### Current Test Scenarios:
1. **User Registration**: Tests successful user registration on the practice website

## 🛠️ Technology Stack

- **Framework**: [Playwright](https://playwright.dev/)
- **Test Framework**: [Cucumber](https://cucumber.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Reports**: [Allure](https://docs.qameta.io/allure/) + HTML Reports
- **IDE Support**: [VS Code](https://code.visualstudio.com/)

## ✅ Separation of Concerns

This project follows best practices:
- **`src/pages/`** - Page Objects (UI interactions)
- **`src/steps/`** - Step Definitions (Cucumber steps)
- **`src/support/`** - Support code (hooks, utilities)
- **`tests/features/`** - Test scenarios (Feature files)
- **`reports/`** - Generated test reports
