import pLimit from 'p-limit';
import { GitHubClient } from '../clients/github.client';
import { UserRepoResponse, GitHubRepo, GitHubBranch } from '../interfaces/github.interface';
import { config } from '../config/env.config';

export class RepoService {
  private githubClient: GitHubClient;

  constructor() {
    this.githubClient = new GitHubClient();
  }

  async getUserReposWithBranches(username: string, includeForks: boolean = false): Promise<UserRepoResponse[]> {
    const repos: GitHubRepo[] = await this.githubClient.getUserRepos(username);
    const filteredRepos = includeForks ? repos : repos.filter((repo: GitHubRepo) => !repo.fork);
    const concurrency = config.githubToken ? 10 : 2;
    const limit = pLimit(concurrency);
    const repoDetailsPromises = filteredRepos.map((repo: GitHubRepo) => 
      limit(async () => {
        const branches: GitHubBranch[] = await this.githubClient.getRepoBranches(repo.owner.login, repo.name);
        return {
          repoName: repo.name,
          ownerLogin: repo.owner.login,
          branches: branches.map((branch: GitHubBranch) => ({
            name: branch.name,
            sha: branch.commit.sha
          }))
        };
      })
    );

    return Promise.all(repoDetailsPromises);
  }
}
