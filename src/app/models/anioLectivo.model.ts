export interface AnioLectivo {
  _id: string;  // Identificador único del año lectivo
  nombre: string;  // Nombre del año lectivo (ej. "2025-2026")
  grado_ids: string[];  // Lista de IDs de los grados asociados a este año lectivo
}
