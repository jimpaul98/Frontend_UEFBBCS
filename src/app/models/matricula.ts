export interface Matricula {
  _id?: string;
  estudianteId: string;
  cursoId: string;
  fecha: string;     // ISO
  activo: boolean;

  // opcional si el backend devuelve poblado/etiquetas
  estudianteNombre?: string; // "Apellidos Nombres"
  estudianteDni?: string;
  cursoNombre?: string;
  paralelo?: string;
  anioNombre?: string;
}
