export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export class InvalidRequestError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(401, message, details);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(403, message, details);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(404, message, details);
  }
}
