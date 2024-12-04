export interface ApiError<T = unknown> {
  status: number;
  data: T & { message: string; code: number };
}
