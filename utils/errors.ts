/**
 * Error handling utilities
 */

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class RateLimitError extends Error {
  constructor(
    public message: string,
    public retryAfter?: number,
  ) {
    super(message);
    this.name = "RateLimitError";
  }
}

export class ResearchError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ResearchError";
  }
}

export const handleError = (error: unknown): { message: string; statusCode: number } => {
  if (error instanceof APIError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof ValidationError) {
    return {
      message: error.message,
      statusCode: 400,
    };
  }

  if (error instanceof RateLimitError) {
    return {
      message: error.message,
      statusCode: 429,
    };
  }

  if (error instanceof Error) {
    console.error("Error:", error.message);
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: "An unknown error occurred",
    statusCode: 500,
  };
};

export const logError = (
  context: string,
  error: unknown,
  metadata?: Record<string, unknown>,
): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`[${context}] ${errorMessage}`, metadata || "");
};
