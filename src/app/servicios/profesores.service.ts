import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from '../models/profesor.model'; // Importa el modelo de Profesor

@Injectable({ providedIn: 'root' })
export class ProfesoresService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';  // Ajusta la URL según sea necesario

  // Obtener la lista de todos los profesores
  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiUrl}/profesores`);
  }

  // Registrar un nuevo profesor
  registrarProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(`${this.apiUrl}/profesores`, profesor);
  }

  eliminarProfesor(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/profesores/${id}`);
}


}
