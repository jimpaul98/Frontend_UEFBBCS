export interface Materia {
  _id: string;          // Identificador único de la materia
  nombre: string;       // Nombre de la materia
  descripcion: string;  // Descripción de la materia
  id_profesor: string;  // Relación con el profesor (ID del profesor)
}
