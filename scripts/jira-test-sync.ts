import { JiraUtility } from '../src/utils/jira-utility';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

async function isStoryCovered(storyKey: string): Promise<boolean> {
  const files = glob.sync('tests/**/*.spec.ts');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(storyKey)) {
      return true;
    }
  }
  return false;
}

async function main() {
  try {
    console.log('Fetching user stories from Jira...');
    const stories = await JiraUtility.fetchUserStories();

    if (!stories) {
      console.error('Failed to fetch stories from Jira.');
      process.exit(1);
    }

    console.log(`Found ${stories.length} stories.`);
    const uncoveredStories = [];

    for (const story of stories) {
      if (!(await isStoryCovered(story.key))) {
        uncoveredStories.push(story);
      }
    }

    console.log(`Uncovered stories: ${uncoveredStories.length}`);
    console.log(JSON.stringify(uncoveredStories, null, 2));
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
