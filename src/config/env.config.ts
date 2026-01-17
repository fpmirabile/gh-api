import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  port: string | number;
  githubToken: string | undefined;
  githubBaseUrl: string;
}

export const config: Config = {
  port: process.env.PORT || 3000,
  githubToken: process.env.GITHUB_TOKEN,
  githubBaseUrl: 'https://api.github.com'
};
