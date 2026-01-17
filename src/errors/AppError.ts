export class AppError extends Error {
  public readonly status: number;
  public readonly errors?: unknown;

  constructor(message: string, status: number, errors?: unknown) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', errors?: unknown) {
    super(message, 400, errors);
  }
}

export class NotAcceptableError extends AppError {
  constructor(message = 'Not Acceptable') {
    super(message, 406);
  }
}

export class GitHubRateLimitError extends AppError {
  constructor(message = 'GitHub API rate limit exceeded. Please try again later or provide a GITHUB_TOKEN.') {
    super(message, 403);
  }
}

export class GitHubApiError extends AppError {
  constructor(message = 'Error communicating with GitHub', status = 502, errors?: unknown) {
    super(message, status, errors);
  }
}
