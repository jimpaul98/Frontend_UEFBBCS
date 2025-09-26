import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula';

const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  private base = `${API_BASE}/matriculas`;
  constructor(private http: HttpClient) {}

  listar(params?: { page?: number; limit?: number; search?: string }):
    Observable<{data: Matricula[], pagina?: number, total?: number}> {
    let hp = new HttpParams();
    if (params) Object.entries(params).forEach(([k,v])=>{
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    return this.http.get<{data: Matricula[], pagina?: number, total?: number}>(this.base, { params: hp });
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

  eliminar(id: string): Observable<{ok: boolean}> {
    return this.http.delete<{ok: boolean}>(`${this.base}/${id}`);
  }
}
