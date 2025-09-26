export interface Matricula {
  _id?: string;

  // Campos “humanos”
  cedula: string;
  nombres: string;
  apellidos: string;
  correo?: string;
  telefono?: string;
  curso: string;
  paralelo: string;
  anioLectivo: string;

  // Meta
  fecha?: string;     // ISO o 'yyyy-mm-dd' (en formularios)
  activo?: boolean;

  // (opcionales si el backend los incluye)
  createdAt?: string;
  updatedAt?: string;
}
