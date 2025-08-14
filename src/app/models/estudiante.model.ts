export interface Estudiante {
  _id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaNacimiento: string;
  id_grado: string;  // Asegúrate de que esta propiedad esté en el modelo
  padre: {
    nombre: string;
    telefono: string;
    email: string;
  };
}
