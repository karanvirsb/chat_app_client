export interface PaginatedGroupMessages<T> {
  hasNextPage: boolean;
  nextPage: string | null;
  data: T[];
}
