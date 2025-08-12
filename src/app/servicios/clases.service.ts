import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clase {
  _id: string;
  grado: string;
  seccion: string;
  id_profesor: string;
  estudiantes: string[];  // IDs de los estudiantes
}

@Injectable({ providedIn: 'root' })
export class ClasesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  // Obtener todas las clases
  obtenerClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrl}/clases`);
  }

  // Registrar una nueva clase
  registrarClase(clase: Clase): Observable<Clase> {
    return this.http.post<Clase>(`${this.apiUrl}/clases`, clase);
  }

  // Eliminar una clase por su ID
  eliminarClase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clases/${id}`);
  }

  // Obtener una clase por su ID
  obtenerClasePorId(id: string): Observable<Clase> {
    return this.http.get<Clase>(`${this.apiUrl}/clases/${id}`);
  }

  // Actualizar una clase por su ID
  actualizarClase(id: string, clase: Clase): Observable<Clase> {
    return this.http.put<Clase>(`${this.apiUrl}/clases/${id}`, clase);
  }
}
