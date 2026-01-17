export interface GitHubRepo {
  name: string;
  fork: boolean;
  owner: {
    login: string;
  };
  branches_url: string;
}

export interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
  };
}

export interface UserRepoResponse {
  repoName: string;
  ownerLogin: string;
  branches: {
    name: string;
    sha: string;
  }[];
}
