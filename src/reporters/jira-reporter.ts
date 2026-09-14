import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { JiraUtility } from '../utils/jira-utility';

class JiraReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed' || result.status === 'timedOut') {
      const summary = `[Playwright] Test Failed: ${test.title}`;
      const description = `
Test Case: ${test.title}
File: ${test.location.file}
Error: ${result.error?.message || 'No error message provided'}
Stack Trace: ${result.error?.stack || 'No stack trace provided'}
      `.trim();

      console.log(`Logging failure to Jira: ${summary}...`);
      await JiraUtility.createBug(summary, description);
    }
  }
}

export default JiraReporter;
