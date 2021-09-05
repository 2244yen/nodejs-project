export interface PaginationInterface {
  query: {
    keyword?: string,
    page?: string,
    limit?: string,
    sortBy?: string,
    sortDir?: string
  };
}

export interface ParamInterface {
  params: {
    id: String
  }
}
