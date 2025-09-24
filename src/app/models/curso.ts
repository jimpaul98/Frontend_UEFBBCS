export interface Curso {
  _id: string;
  nombre: string; grado?: string; paralelo?: string;
  trimestre: number;
  anioLectivoId: { _id: string; clave: string; nombre: string; activo: boolean } | string;
  materiaId: { _id: string; nombre: string } | string;
  profesorId: { _id: string; nombre: string } | string;
}
