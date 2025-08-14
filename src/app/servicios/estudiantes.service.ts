import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';  // Asegúrate de tener el modelo de Estudiante

@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  // Obtener todos los estudiantes
  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiantes`);
  }

  // Registrar un nuevo estudiante
  registrarEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.apiUrl}/estudiantes`, estudiante);
  }

  // Eliminar un estudiante por su ID
  eliminarEstudiante(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/estudiantes/${id}`);
  }

  // Obtener un estudiante por su ID
  obtenerEstudiantePorId(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/estudiantes/${id}`);
  }

  // Actualizar un estudiante por su ID
  actualizarEstudiante(id: string, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}/estudiantes/${id}`, estudiante);
  }
}
