import request from 'supertest';
import nock from 'nock';
import app from '../../src/app';

describe('GitHub Repos API Integration Tests', () => {
  const username = 'testuser';

  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return 200 and repos with branches (Happy Path)', async () => {
    nock('https://api.github.com')
      .get(`/users/${username}/repos`)
      .reply(200, [
        {
          name: 'repo1',
          fork: false,
          owner: { login: username },
          branches_url: `https://api.github.com/repos/${username}/repo1/branches{/branch}`
        }
      ]);

    nock('https://api.github.com')
      .get(`/repos/${username}/repo1/branches`)
      .reply(200, [
        {
          name: 'main',
          commit: { sha: 'sha1' }
        }
      ]);

    const response = await request(app)
      .get(`/api/users/${username}/repos`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toEqual({
      repoName: 'repo1',
      ownerLogin: username,
      branches: [{ name: 'main', sha: 'sha1' }]
    });
  });

  // Nuevo test para verificar includeForks=true
  it('should include forks when query param includeForks is true', async () => {
    nock('https://api.github.com')
      .get(`/users/${username}/repos`)
      .reply(200, [
        {
          name: 'repo1',
          fork: true, // This is a fork
          owner: { login: username },
          branches_url: `https://api.github.com/repos/${username}/repo1/branches{/branch}`
        }
      ]);

    nock('https://api.github.com')
      .get(`/repos/${username}/repo1/branches`)
      .reply(200, [{ name: 'main', commit: { sha: 'sha1' } }]);

    const response = await request(app)
      .get(`/api/users/${username}/repos?includeForks=true`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].repoName).toBe('repo1');
  });

  it('should return 404 when user is not found', async () => {
    nock('https://api.github.com')
      .get(`/users/${username}/repos`)
      .reply(404, { message: 'Not Found' });

    const response = await request(app)
      .get(`/api/users/${username}/repos`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('GitHub user or repository not found');
  });

  it('should return healthy status for /api/health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('UP');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/api/invalid-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toContain('not found');
  });

  it('should return 406 when Accept header is missing or incorrect', async () => {
    const response = await request(app)
      .get(`/api/users/${username}/repos`);

    expect(response.status).toBe(406);
    expect(response.body.message).toContain('Accept header must be application/json');
  });
});
