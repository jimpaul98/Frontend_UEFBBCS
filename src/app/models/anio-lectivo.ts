export interface Trimestre {
  numero: number; nombre: string; inicio: string; fin: string;
}
export interface AnioLectivo {
  _id: string; clave: string; nombre: string; activo: boolean; trimestres: Trimestre[];
}
