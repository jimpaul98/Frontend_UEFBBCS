import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula';
import { PagedResponse } from '../models/paged-response';

// Ajusta según tu environment si lo usas
const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  private base = `${API_BASE}/matriculas`;

  constructor(private http: HttpClient) {}

  /**
   * Listar matrículas con filtros “humanos”
   * @param params search | cedula | curso | paralelo | anioLectivo | page | limit | activo
   */
  listar(params?: {
    search?: string;
    cedula?: string;
    curso?: string;
    paralelo?: string;
    anioLectivo?: string;
    page?: number;
    limit?: number;
    activo?: boolean;
  }): Observable<PagedResponse<Matricula>> {
    let hp = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          if (k === 'activo') {
            hp = hp.set(k, (v as boolean) ? 'true' : 'false');
          } else {
            hp = hp.set(k, String(v));
          }
        }
      });
    }
    return this.http.get<PagedResponse<Matricula>>(this.base, { params: hp });
  }

  obtener(id: string): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.base}/${id}`);
  }

  crear(body: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.base, body);
  }

  actualizar(id: string, body: Partial<Matricula>): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.base}/${id}`, body);
  }

  eliminar(id: string): Observable<{ ok: boolean; mensaje?: string }> {
    return this.http.delete<{ ok: boolean; mensaje?: string }>(`${this.base}/${id}`);
  }

  // ===== Utilidades Excel (mismos campos) =====

  /**
   * Descarga plantilla .xlsx con columnas:
   * cedula, nombres, apellidos, correo, telefono, curso, paralelo, anioLectivo
   */
  descargarPlantilla(): Observable<Blob> {
    return this.http.get(`${this.base}/util/plantilla-excel`, { responseType: 'blob' });
  }

  /**
   * Importa un archivo .xlsx (form-data: file)
   * Respuesta: { resumen: { procesadas, ok, fail }, resultados: [{ fila, ok, mensaje?, error? }] }
   */
  importarExcel(file: File): Observable<HttpEvent<any>> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${this.base}/util/importar-excel`, fd, {
      observe: 'events',
      reportProgress: true
    });
  }
}
