export interface PagedResponse<T> {
  data: T[];
  pagina?: number;
  total?: number;
}
