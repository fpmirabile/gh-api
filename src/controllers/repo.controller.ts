import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RepoService } from '../services/repo.service';

interface RepoParams extends ParamsDictionary {
  username: string;
}

interface RepoQuery {
  includeForks?: string;
}

export class RepoController {
  private repoService: RepoService;

  constructor() {
    this.repoService = new RepoService();
  }

  getUserRepos = async (req: Request<RepoParams, unknown, unknown, RepoQuery>, res: Response) => {
    const { username } = req.params;
    const includeForks = req.query.includeForks === 'true';
    const data = await this.repoService.getUserReposWithBranches(username, includeForks);
    res.success(data);
  };
}
