export interface Result<T> {
    code: number,
    msg: string,
    detail: T
}
export interface User {
  account_id: string;
  aws_type: string;
  role: string;
}
