export interface IPagedReq<T> {
  results: T[];
  count: number;
  next: string;
  previous: string;
}

export interface IReqError {
  error: {
    statusCode: number;
    message: string;
    error: string;
  };
}

export type TTimeout = ReturnType<typeof setTimeout> | undefined;
