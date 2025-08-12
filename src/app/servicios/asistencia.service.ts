import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asistencia {
  id_estudiante: string;
  id_clase: string;
  fecha: string;
  asistio: boolean;
}

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  registrarAsistencia(asistencia: any) {
    return this.http.post(`${this.apiUrl}/asistencia`, asistencia);
  }
}
