import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from '../models/profesor';

const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  private base = `${API_BASE}/profesores`;
  constructor(private http: HttpClient) {}

  listar(params?: { page?: number; limit?: number; search?: string }): Observable<{data: Profesor[], pagina?: number, total?: number}> {
    let hp = new HttpParams();
    if (params) Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    return this.http.get<{data: Profesor[], pagina?: number, total?: number}>(this.base, { params: hp });
  }

  obtener(id: string): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.base}/${id}`);
  }

  crear(body: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.base, body);
  }

  actualizar(id: string, body: Partial<Profesor>): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.base}/${id}`, body);
  }

  eliminar(id: string): Observable<{ok: boolean}> {
    return this.http.delete<{ok: boolean}>(`${this.base}/${id}`);
  }
}
