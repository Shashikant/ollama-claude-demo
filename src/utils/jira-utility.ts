import dotenv from 'dotenv';
dotenv.config();

export class JiraUtility {
  private static host = process.env.JIRA_HOST;
  private static email = process.env.JIRA_EMAIL;
  private static apiToken = process.env.JIRA_API_TOKEN;
  private static projectKey = process.env.JIRA_PROJECT_KEY;

  static async createBug(summary: string, description: string): Promise<string | null> {
    if (!this.host || !this.email || !this.apiToken || !this.projectKey) {
      console.error('Missing Jira credentials in .env file');
      return null;
    }

    const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');

    try {
      const response = await fetch(`${this.host}/rest/api/2/issue`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            project: {
              key: this.projectKey,
            },
            summary: summary,
            description: description,
            issuetype: {
              name: 'Bug',
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Jira API Error: ${response.status} - ${errorData}`);
        return null;
      }

      const data = await response.json();
      console.log(`Bug successfully created in Jira: ${data.key}`);
      return data.key;
    } catch (error) {
      console.error(`Failed to create Jira bug: ${error}`);
      return null;
    }
  }
}
