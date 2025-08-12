export interface Asistencia {
  _id?: string;          // Hacer _id opcional para las nuevas instancias
  id_estudiante: string;
  id_clase: string;
  fecha: string;
  asistio: boolean;
}
