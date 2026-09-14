import dotenv from 'dotenv';
dotenv.config();

export class JiraUtility {
  private static host = process.env.JIRA_HOST;
  private static email = process.env.JIRA_EMAIL;
  private static apiToken = process.env.JIRA_API_TOKEN;
  private static projectKey = process.env.JIRA_PROJECT_KEY;

  private static getHost() {
    return this.host?.replace(/\/$/, '') || '';
  }

  static async createBug(summary: string, description: string): Promise<string | null> {
    if (!this.host || !this.email || !this.apiToken || !this.projectKey) {
      console.error('Missing Jira credentials in .env file');
      return null;
    }

    const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');

    try {
      const response = await fetch(`${this.getHost()}/rest/api/2/issue`, {
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

  static async fetchUserStories(): Promise<Array<{ key: string, summary: string, description: string }> | null> {
    if (!this.host || !this.email || !this.apiToken || !this.projectKey) {
      console.error('Missing Jira credentials in .env file');
      return null;
    }

    const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');
    const jql = `project = ${this.projectKey} AND issuetype = "Story" AND status != "Done"`;
    const url = `${this.getHost()}/rest/api/3/search/jql`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jql: jql,
          fields: ['summary', 'description'],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Jira API Error: ${response.status} - ${errorData}`);
        return null;
      }

      const data = await response.json();
      return data.issues.map((issue: any) => {
        let description = '';
        if (issue.fields.description && Array.isArray(issue.fields.description.content)) {
          description = issue.fields.description.content
            .map((block: any) => block.content?.[0]?.text || '')
            .join(' ');
        } else if (typeof issue.fields.description === 'string') {
          description = issue.fields.description;
        }

        return {
          key: issue.key,
          summary: issue.fields.summary,
          description: description,
        };
      });
    } catch (error) {
      console.error(`Failed to fetch Jira stories: ${error}`);
      return null;
    }
  }
}
