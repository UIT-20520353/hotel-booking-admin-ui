/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BadRequestFieldError {
  [key: string]: string[];
}

interface ErrorData {
  messageCode: string;
  [key: string]: string;
}

export interface HttpError {
  unauthorized: boolean;
  badRequest: boolean;
  notFound: boolean;
  clientError: boolean;
  serverError: boolean;
  message: string;
  title?: string;
  fieldErrors?: BadRequestFieldError;
  errors?: any;
  detail?: string;
  data?: ErrorData;
}

export interface HttpResponse<T = unknown> {
  status: number;
  ok: boolean;
  body?: T;
  pagination?: Pagination;
  error?: HttpError;
}
