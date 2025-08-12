import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profesor {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  especialidad: string;
  materias: string[];  // Array de IDs de las materias que enseña
}

@Injectable({ providedIn: 'root' })
export class ProfesoresService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiUrl}/profesores`);
  }

  registrarProfesor(profesor: any) {
    return this.http.post(`${this.apiUrl}/profesores`, profesor);
  }

  eliminarProfesor(id: string) {
    return this.http.delete(`${this.apiUrl}/profesores/${id}`);
  }

  obtenerProfesorPorId(id: string) {
    return this.http.get(`${this.apiUrl}/profesores/${id}`);
  }

  actualizarProfesor(id: string, profesor: any) {
    return this.http.put(`${this.apiUrl}/profesores/${id}`, profesor);
  }
}
