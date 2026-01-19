import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: string | number;
  githubToken: string | undefined;
  githubBaseUrl: string;
}

export const config: Config = {
  port: process.env.PORT || 3000,
  githubToken: process.env.GITHUB_TOKEN,
  githubBaseUrl: process.env.GITHUB_BASE_URL || 'https://api.github.com'
};
