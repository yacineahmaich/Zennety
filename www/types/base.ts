export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

export type Paginator<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
  };
};
