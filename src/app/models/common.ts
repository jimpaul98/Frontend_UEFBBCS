export interface Paged<T> {
  data: T[];
  pagina?: number;
  total?: number;
}
