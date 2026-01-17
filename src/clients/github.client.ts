import axios, { AxiosInstance } from 'axios';
import { GitHubRepo, GitHubBranch } from '../interfaces/github.interface';
import { config } from '../config/env.config';
import { GitHubApiError, GitHubRateLimitError, NotFoundError } from '../errors/AppError';

export class GitHubClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.githubBaseUrl,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Express-API-App',
        ...(config.githubToken && { 'Authorization': `Bearer ${config.githubToken}` })
      }
    });
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    try {
      const { data } = await this.axiosInstance.get<GitHubRepo[]>(`/users/${username}/repos`);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRepoBranches(owner: string, repo: string): Promise<GitHubBranch[]> {
    try {
      const { data } = await this.axiosInstance.get<GitHubBranch[]>(`/repos/${owner}/${repo}/branches`);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(err: unknown): Error {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 404) {
        return new NotFoundError('GitHub user or repository not found');
      }
      
      if (status === 403 && err.response?.headers['x-ratelimit-remaining'] === '0') {
        return new GitHubRateLimitError();
      }
      
      return new GitHubApiError(err.message, status, err.response?.data);
    }
    
    return err instanceof Error ? err : new Error('An unexpected error occurred');
  }
}
