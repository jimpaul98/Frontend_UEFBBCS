import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia';

const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class MateriaService {
  private base = `${API_BASE}/materias`;
  constructor(private http: HttpClient) {}

  listar(params?: { page?: number; limit?: number; search?: string }): Observable<{data: Materia[], pagina?: number, total?: number}> {
    let hp = new HttpParams();
    if (params) Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    return this.http.get<{data: Materia[], pagina?: number, total?: number}>(this.base, { params: hp });
  }

  obtener(id: string): Observable<Materia> {
    return this.http.get<Materia>(`${this.base}/${id}`);
  }

  crear(body: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.base, body);
  }

  actualizar(id: string, body: Partial<Materia>): Observable<Materia> {
    return this.http.put<Materia>(`${this.base}/${id}`, body);
  }

  eliminar(id: string): Observable<{ok: boolean}> {
    return this.http.delete<{ok: boolean}>(`${this.base}/${id}`);
  }
}
