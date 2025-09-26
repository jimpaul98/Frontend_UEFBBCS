import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private base = `${API_BASE}/cursos`;
  constructor(private http: HttpClient) {}

  listar(params?: { page?: number; limit?: number; search?: string }): Observable<{data: Curso[], pagina?: number, total?: number}> {
    let hp = new HttpParams();
    if (params) Object.entries(params).forEach(([k,v]) => {
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    return this.http.get<{data: Curso[], pagina?: number, total?: number}>(this.base, { params: hp });
  }

  obtener(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.base}/${id}`);
  }

  crear(body: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.base, body);
  }

  actualizar(id: string, body: Partial<Curso>): Observable<Curso> {
    return this.http.put<Curso>(`${this.base}/${id}`, body);
  }

  eliminar(id: string): Observable<{ok: boolean}> {
    return this.http.delete<{ok: boolean}>(`${this.base}/${id}`);
  }
}
