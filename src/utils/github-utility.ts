import dotenv from 'dotenv';
import { execSync } from 'child_process';
dotenv.config();

export class GitHubUtility {
  private static token = process.env.GIT_TOKEN;
  private static repoUrl = process.env.GIT_REPO_URL;
  private static userEmail = process.env.GIT_USER_EMAIL;
  private static userName = process.env.GIT_USER_NAME;

  static async pushAndTrigger(commitMessage: string, branch: string = 'main'): Promise<boolean> {
    if (!this.token || !this.repoUrl) {
      console.error('Missing Git credentials in .env file');
      return false;
    }

    try {
      // Set git user config
      execSync(`git config user.email "${this.userEmail}"`);
      execSync(`git config user.name "${this.userName}"`);

      // Stage and commit changes
      execSync('git add .');
      execSync(`git commit -m "${commitMessage}"`);

      // Push using token in URL for authentication
      const remoteUrlWithToken = this.repoUrl.replace(
        'https://',
        `https://x-access-token:${this.token}@`
      );

      execSync(`git push ${remoteUrlWithToken} ${branch}`);
      console.log('Changes pushed to GitHub successfully.');

      // Trigger GitHub Action
      await this.triggerWorkflow(branch);

      return true;
    } catch (error) {
      console.error(`GitHub Utility Error: ${error}`);
      return false;
    }
  }

  private static async triggerWorkflow(branch: string): Promise<void> {
    const repoPath = this.repoUrl.replace('https://', '').replace('.git', '').split('/');
    const owner = repoPath[0];
    const repo = repoPath[1];

    // We assume the workflow file is named 'playwright.yml'
    const workflowId = 'playwright.yml';

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          ref: branch,
        }),
      });

      if (response.ok) {
        console.log('GitHub Action triggered successfully.');
      } else {
        const errorData = await response.text();
        console.error(`Failed to trigger GitHub Action: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error(`Error triggering GitHub Action: ${error}`);
    }
  }
}
