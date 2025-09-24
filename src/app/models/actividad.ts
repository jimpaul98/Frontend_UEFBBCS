export type Categoria = 'REV'|'PRB'|'TAR'|'PROYI'|'EXP'|'TAL'|'DESA'|'PI1'|'EVAL';

export interface Actividad {
  _id: string;
  cursoId: string;
  trimestre: number;
  titulo: string;
  categoria: Categoria;
  puntajeMax: number;
  fecha?: string;
  peso?: number;
}
