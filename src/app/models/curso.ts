export interface Curso {
  _id?: string;
  nombre: string;
  paralelo: string;
  materiaId: string;
  profesorId: string;
  anioLectivoId?: string; 
  activo: boolean;

  // opcional si tu API “puebla” datos:
  materiaNombre?: string;
  profesorNombre?: string; // "Apellidos Nombres"
  anioNombre?: string;
}
