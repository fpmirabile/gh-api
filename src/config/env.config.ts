import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  githubToken: process.env.GITHUB_TOKEN,
  githubBaseUrl: 'https://api.github.com'
};
