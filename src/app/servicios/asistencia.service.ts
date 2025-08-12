import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia.model';  // Importa el modelo correcto

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL según la configuración de tu API

  // Obtener todas las asistencias
  obtenerAsistencias(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${this.apiUrl}/asistencias`);
  }

  // Registrar una nueva asistencia
  registrarAsistencia(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(`${this.apiUrl}/asistencias`, asistencia);
  }

  // Eliminar una asistencia por ID
  eliminarAsistencia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/asistencias/${id}`);
  }

  // Obtener una asistencia por ID
  obtenerAsistenciaPorId(id: string): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.apiUrl}/asistencias/${id}`);
  }

  // Actualizar una asistencia por ID
  actualizarAsistencia(id: string, asistencia: Asistencia): Observable<Asistencia> {
    return this.http.put<Asistencia>(`${this.apiUrl}/asistencias/${id}`, asistencia);
  }
}
