import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clase {
  id: string;
  grado: string;
  seccion: string;
  id_profesor: string; // ID del profesor encargado de la clase
  estudiantes: string[]; // Array de IDs de estudiantes
}

@Injectable({ providedIn: 'root' })
export class ClasesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  obtenerClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrl}/clases`);
  }

  registrarClase(clase: any) {
    return this.http.post(`${this.apiUrl}/clases`, clase);
  }

  eliminarClase(id: string) {
    return this.http.delete(`${this.apiUrl}/clases/${id}`);
  }

  obtenerClasePorId(id: string) {
    return this.http.get(`${this.apiUrl}/clases/${id}`);
  }

  actualizarClase(id: string, clase: any) {
    return this.http.put(`${this.apiUrl}/clases/${id}`, clase);
  }
}
