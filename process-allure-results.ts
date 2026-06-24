import * as fs from 'fs';
import * as path from 'path';

interface Step {
  keyword: string;
  name: string;
  result: {
    status: string;
    error_message?: string;
  };
}

interface Scenario {
  name: string;
  description?: string;
  steps: Step[];
}

interface Feature {
  name: string;
  elements: Scenario[];
}

interface AllureStep {
  name: string;
  status: string;
  stage: string;
  start: number;
  stop: number;
  duration: number;
  keyword: string;
  statusDetails?: {
    message: string;
  };
}

interface AllureLabel {
  name: string;
  value: string;
}

interface AllureResult {
  uuid: string;
  historyId: string;
  name: string;
  fullName: string;
  statusDetails: Record<string, unknown>;
  status: string;
  stage: string;
  start: number;
  stop: number;
  duration: number;
  description: string;
  descriptionHtml: string;
  steps: AllureStep[];
  labels: AllureLabel[];
  links: unknown[];
  attachments: unknown[];
}

const allureResultsPath = path.join(__dirname, 'reports/allure-results');
const cucumberReportPath = path.join(allureResultsPath, 'allure-results.json');

if (!fs.existsSync(allureResultsPath)) {
  fs.mkdirSync(allureResultsPath, { recursive: true });
}

function generateUUID(): string {
  return Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

// Just process existing cucumber report
if (fs.existsSync(cucumberReportPath)) {
  try {
    const cucumberReportContent = fs.readFileSync(cucumberReportPath, 'utf8');
    const cucumberReport: Feature[] = JSON.parse(cucumberReportContent);

    console.log(`Found ${cucumberReport.length} features in JSON report`);
    console.log(`Features: ${cucumberReport.map(f => f.name).join(', ')}`);

    // Clear old result files
    const oldFiles =  fs.readdirSync(allureResultsPath).filter(file => file.endsWith('-result.json'));
    oldFiles.forEach(file => {
      fs.unlinkSync(path.join(allureResultsPath, file));
    });
    console.log(`Cleared ${oldFiles.length} old result files`);

    let testCaseCount = 0;

    cucumberReport.forEach((feature: Feature) => {
      console.log(`Processing feature: ${feature.name}`);
      if (feature.elements) {
        feature.elements.forEach((scenario: Scenario) => {
          testCaseCount++;
          const testCaseId = generateUUID();
          const resultFile = path.join(allureResultsPath, `${testCaseId}-result.json`);

          let status: string = 'passed';
          let hasFailedStep = false;

          if (scenario.steps) {
            for (const step of scenario.steps) {
              if (step.result && step.result.status === 'failed') {
                status = 'failed';
                hasFailedStep = true;
                break;
              } else if (step.result && step.result.status === 'pending') {
                status = 'skipped';
              }
            }
          }

          const stepsArray: AllureStep[] = scenario.steps
            ? scenario.steps.map((step) => {
                const stepResult: AllureStep = {
                  name: `${step.keyword.trim()} ${step.name}`,
                  status: step.result.status,
                  stage: 'finished',
                  start: Date.now(),
                  stop: Date.now() + 100,
                  duration: 100,
                  keyword: step.keyword
                };

                if (step.result.error_message) {
                  stepResult.statusDetails = {
                    message: step.result.error_message
                  };
                }

                return stepResult;
              })
            : [];

          const allureResult: AllureResult = {
            uuid: testCaseId,
            historyId: `${feature.name}::${scenario.name}`,
            name: scenario.name,
            fullName: `${feature.name}::${scenario.name}`,
            statusDetails: hasFailedStep ? { message: 'Test failed' } : {},
            status: status,
            stage: 'finished',
            start: Date.now(),
            stop: Date.now() + 3000,
            duration: 3000,
            description: feature.name,
            descriptionHtml: `<h1>${feature.name}</h1><p>${scenario.name}</p>`,
            steps: stepsArray,
            labels: [
              { name: 'parentSuite', value: 'Playwright Cucumber' },
              { name: 'suite', value: feature.name },
              { name: 'feature', value: feature.name },
              { name: 'story', value: scenario.name },
              { name: 'package', value: 'playwright.cucumber' },
              { name: 'testClass', value: 'Playwright' },
              { name: 'testMethod', value: scenario.name.replace(/\s+/g, '_').toLowerCase() }
            ],
            links: [],
            attachments: []
          };

          fs.writeFileSync(resultFile, JSON.stringify(allureResult, null, 2));
          console.log(`✓ Generated Allure result for: ${scenario.name}`);
        });
      }
    });

    console.log(`\n✅ Allure results generated successfully! (${testCaseCount} test cases)`);
  } catch (error) {
    console.error('Error processing Cucumber report:', error);
    process.exit(1);
  }
} else {
  console.log('Cucumber report not found.');
  process.exit(1);
}
