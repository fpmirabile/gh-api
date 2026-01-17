import request from "supertest";
import nock from "nock";
import app from "../src/app";
import { config } from "../src/config/env.config";

type MockResponse = Record<string, unknown> | Record<string, unknown>[];

const mockGithubUserRepos = (
  username: string,
  status = 200,
  response: MockResponse = [],
) => {
  let scope = nock(config.githubBaseUrl).get(`/users/${username}/repos`);
  if (config.githubToken) {
    scope = scope.matchHeader("authorization", `Bearer ${config.githubToken}`);
  }

  scope.reply(status, response);
};

const mockGithubRepoBranches = (
  username: string,
  repo: string,
  status = 200,
  response: MockResponse = [],
) => {
  let scope = nock(config.githubBaseUrl).get(
    `/repos/${username}/${repo}/branches`,
  );
  if (config.githubToken) {
    scope = scope.matchHeader("authorization", `Bearer ${config.githubToken}`);
  }

  scope.reply(status, response);
};

describe("GitHub Repos API Integration Tests", () => {
  const username = "testuser";

  beforeEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.restore();
  });

  it("Should return 200 and repos with branches", async () => {
    const mockRepo = {
      name: "repo1",
      fork: false,
      owner: { login: username },
      branches_url: `https://api.github.com/repos/${username}/repo1/branches{/branch}`,
    };
    const mockBranch = { name: "main", commit: { sha: "sha1" } };

    mockGithubUserRepos(username, 200, [mockRepo]);
    mockGithubRepoBranches(username, "repo1", 200, [mockBranch]);

    const response = await request(app)
      .get(`/api/users/${username}/repos`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toEqual({
      repoName: "repo1",
      ownerLogin: username,
      branches: [{ name: "main", sha: "sha1" }],
    });
  });

  it("Should include forks when query param includeForks is true", async () => {
    const mockRepoFork = {
      name: "repo1",
      fork: true,
      owner: { login: username },
      branches_url: `https://api.github.com/repos/${username}/repo1/branches{/branch}`,
    };
    const mockBranch = { name: "main", commit: { sha: "sha1" } };

    mockGithubUserRepos(username, 200, [mockRepoFork]);
    mockGithubRepoBranches(username, "repo1", 200, [mockBranch]);

    const response = await request(app)
      .get(`/api/users/${username}/repos?includeForks=true`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].repoName).toBe("repo1");
  });

  it("Should return 404 when user is not found", async () => {
    mockGithubUserRepos(username, 404, { message: "Not Found" });

    const response = await request(app)
      .get(`/api/users/${username}/repos`)
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("GitHub user or repository not found");
  });

  it("Should return 404 for unknown routes", async () => {
    const response = await request(app).get("/api/invalid-route");
    expect(response.status).toBe(404);
    expect(response.body.message).toContain("not found");
  });

  it("Should return 406 when Accept header is missing or incorrect", async () => {
    const response = await request(app).get(`/api/users/${username}/repos`);

    expect(response.status).toBe(406);
    expect(response.body.message).toContain(
      "Accept header must be application/json",
    );
  });
});
