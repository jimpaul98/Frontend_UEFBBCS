import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  _id: string;  // Identificador del estudiante
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaNacimiento: string;
  id_clase: string;
  padre: {
    nombre: string;
    telefono: string;
    email: string;
  };
}


@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiantes`);
  }

  registrarEstudiante(estudiante: any) {
    return this.http.post(`${this.apiUrl}/estudiantes`, estudiante);
  }

  eliminarEstudiante(id: string) {
    return this.http.delete(`${this.apiUrl}/estudiantes/${id}`);
  }

  obtenerEstudiantePorId(id: string) {
    return this.http.get(`${this.apiUrl}/estudiantes/${id}`);
  }

  actualizarEstudiante(id: string, estudiante: any) {
    return this.http.put(`${this.apiUrl}/estudiantes/${id}`, estudiante);
  }
}
