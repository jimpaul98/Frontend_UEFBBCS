export interface Matricula {
  _id: string;
  cursoId: any; // populated
  estudianteId: any; // populated
  estado: 'activa'|'retirada'|'finalizada';
  fecha: string;
  observaciones?: string;
}
