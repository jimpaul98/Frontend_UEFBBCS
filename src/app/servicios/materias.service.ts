import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Materia {
  id: string;
  nombre: string;
  descripcion: string;
  id_profesor: string; // ID del profesor que imparte la materia
}

@Injectable({ providedIn: 'root' })
export class MateriasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  obtenerMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/materias`);
  }

  registrarMateria(materia: any) {
    return this.http.post(`${this.apiUrl}/materias`, materia);
  }

  eliminarMateria(id: string) {
    return this.http.delete(`${this.apiUrl}/materias/${id}`);
  }

  obtenerMateriaPorId(id: string) {
    return this.http.get(`${this.apiUrl}/materias/${id}`);
  }

  actualizarMateria(id: string, materia: any) {
    return this.http.put(`${this.apiUrl}/materias/${id}`, materia);
  }
}
