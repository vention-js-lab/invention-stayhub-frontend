export interface WithBaseResponse<T> {
  status: string;
  message: string;
  data: T;
}
