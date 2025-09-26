import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';

const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private base = `${API_BASE}/estudiantes`;
  constructor(private http: HttpClient) {}

  listar(params?: { page?: number; limit?: number; search?: string }):
    Observable<{data: Estudiante[], pagina?: number, total?: number}> {
    let hp = new HttpParams();
    if (params) Object.entries(params).forEach(([k, v])=>{
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    return this.http.get<{data: Estudiante[], pagina?: number, total?: number}>(this.base, { params: hp });
  }

  obtener(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.base}/${id}`);
  }

  crear(body: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.base, body);
  }

  actualizar(id: string, body: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.base}/${id}`, body);
  }

  eliminar(id: string): Observable<{ok: boolean}> {
    return this.http.delete<{ok: boolean}>(`${this.base}/${id}`);
  }
}
