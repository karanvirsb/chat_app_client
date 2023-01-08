export interface Pagination<T> {
  hasNextPage: boolean;
  cursor: Date | null;
  data: T[];
}
