import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnioLectivo {
  _id: string;
  nombre: string;  // Nombre del Año Lectivo (Ejemplo: "2025-2026")
  grado_ids: string[];  // IDs de los grados asociados
}

@Injectable({ providedIn: 'root' })
export class AnioLectivoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';  // Ajusta tu URL

  // Obtener todos los años lectivos
  obtenerAnioLectivos(): Observable<AnioLectivo[]> {
    return this.http.get<AnioLectivo[]>(`${this.apiUrl}/anio-lectivos`);
  }

  // Obtener un año lectivo por su ID
  obtenerAnioLectivoPorId(id: string): Observable<AnioLectivo> {
    return this.http.get<AnioLectivo>(`${this.apiUrl}/anio-lectivos/${id}`);
  }

  // Registrar un nuevo año lectivo
  registrarAnioLectivo(anioLectivo: AnioLectivo): Observable<AnioLectivo> {
    return this.http.post<AnioLectivo>(`${this.apiUrl}/anio-lectivos`, anioLectivo);
  }

  // Eliminar un año lectivo por su ID
  eliminarAnioLectivo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/anio-lectivos/${id}`);
  }

  // Actualizar un año lectivo por su ID
  actualizarAnioLectivo(id: string, anioLectivo: AnioLectivo): Observable<AnioLectivo> {
    return this.http.put<AnioLectivo>(`${this.apiUrl}/anio-lectivos/${id}`, anioLectivo);
  }
}
