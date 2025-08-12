export interface Asistencia {
  _id: string;          // Identificador único de la asistencia
  id_estudiante: string;  // ID del estudiante
  id_clase: string;       // ID de la clase
  fecha: string;          // Fecha de la asistencia
  asistio: boolean;       // Estado de asistencia (Sí o No)
}
