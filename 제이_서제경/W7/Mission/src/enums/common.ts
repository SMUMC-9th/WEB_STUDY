export const PAGINATION_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type PaginationOrder =
  (typeof PAGINATION_ORDER)[keyof typeof PAGINATION_ORDER];
