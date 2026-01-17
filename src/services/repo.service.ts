import pLimit from 'p-limit';
import { GitHubClient } from '../clients/github.client';
import { UserRepoResponse, GitHubRepo, GitHubBranch } from '../interfaces/github.interface';

export class RepoService {
  private githubClient: GitHubClient;

  constructor() {
    this.githubClient = new GitHubClient();
  }

  async getUserReposWithBranches(username: string, includeForks: boolean = false): Promise<UserRepoResponse[]> {
    const repos: GitHubRepo[] = await this.githubClient.getUserRepos(username);
    const filteredRepos = includeForks ? repos : repos.filter((repo: GitHubRepo) => !repo.fork);

    /**
     * Limiting concurrency to 5 to avoid hitting GitHub API rate limits
     * and to provide a more predictable performance profile by sending
     * requests in controlled batches.
     */
    const limit = pLimit(5);
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
