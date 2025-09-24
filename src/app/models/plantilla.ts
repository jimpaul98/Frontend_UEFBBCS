export interface PlanillaRow {
  estudianteId: string;
  dni: string|null;
  nombres: string|null;
  apellidos: string|null;
  REV: number|null; PRB: number|null; TAR: number|null; PROYI: number|null;
  PROMEDIO_IND: number|null; TOTAL_35_IND: number;
  EXP: number|null; TAL: number|null; DESA: number|null;
  PROMEDIO_GRP: number|null; TOTAL_35_GRP: number;
  PI1: number|null; PORC_10_PI1: number; EVAL: number|null; PORC_20_EVAL: number; TOTAL_30: number;
  PROMEDIO_TRIMESTRE: number; CUALITATIVA: string|null;
}
export interface PlanillaResponse {
  cursoId: string; trimestre: number; data: PlanillaRow[];
}
