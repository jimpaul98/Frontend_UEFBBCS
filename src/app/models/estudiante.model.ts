export interface Estudiante {
  _id: string;  // Identificador único del estudiante
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaNacimiento: string;
  id_clase: string;  // Relación con la clase a la que pertenece
  padre: {
    nombre: string;
    telefono: string;
    email: string;
  };
}
