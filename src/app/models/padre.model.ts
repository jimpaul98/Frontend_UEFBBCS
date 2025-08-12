export interface Padre {
  _id: string;  // Identificador único del padre
  nombre: string;
  telefono: string;
  email: string;
  id_estudiante: string;  // Relación con el estudiante
}
