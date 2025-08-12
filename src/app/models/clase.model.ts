export interface Clase {
  _id: string;  // Identificador único de la clase
  grado: string;  // Grado (ej. 1er grado, 2do grado)
  seccion: string;  // Sección (ej. A, B, C)
  id_profesor: string;  // Relación con el profesor
  estudiantes: string[];  // IDs de los estudiantes que están en esta clase
}
