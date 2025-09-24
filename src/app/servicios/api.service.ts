import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBase;
  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: Record<string, any>) {
    let hp = new HttpParams();
    if (params) Object.entries(params).forEach(([k,v]) => {
      if (v !== undefined && v !== null && v !== '') hp = hp.set(k, String(v));
    });
    return this.http.get<T>(`${this.base}${path}`, { params: hp });
  }
  post<T>(path: string, body: any) { return this.http.post<T>(`${this.base}${path}`, body); }
  put<T>(path: string, body: any) { return this.http.put<T>(`${this.base}${path}`, body); }
  delete<T>(path: string) { return this.http.delete<T>(`${this.base}${path}`); }
}
