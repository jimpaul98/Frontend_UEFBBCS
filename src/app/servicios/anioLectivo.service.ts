import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AnioLectivo } from '../models/anio-lectivo';
import { Observable } from 'rxjs';

const API_BASE = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class AnioLectivoService {
  private base = `${API_BASE}/anios-lectivos`;
  constructor(private http: HttpClient) {}

  listar(params?: { page?: number; limit?: number; search?: string }): Observable<{data: AnioLectivo[], pagina?: number, total?: number}> {
    let hp = new HttpParams();
    if (params) Object.entries(params).forEach(([k,v])=>{
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    return this.http.get<{data: AnioLectivo[], pagina?: number, total?: number}>(this.base, { params: hp });
  }

  obtener(id: string): Observable<AnioLectivo> {
    return this.http.get<AnioLectivo>(`${this.base}/${id}`);
  }

  crear(body: AnioLectivo): Observable<AnioLectivo> {
    return this.http.post<AnioLectivo>(this.base, body);
  }

  actualizar(id: string, body: Partial<AnioLectivo>): Observable<AnioLectivo> {
    return this.http.put<AnioLectivo>(`${this.base}/${id}`, body);
  }

  eliminar(id: string): Observable<{ok: boolean}> {
    return this.http.delete<{ok: boolean}>(`${this.base}/${id}`);
  }
}
