import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia';  // Asegúrate de tener la interfaz correcta importada

@Injectable({ providedIn: 'root' })
export class MateriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  // Obtener todas las materias
  obtenerMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/materias`);
  }

  // Registrar una nueva materia
  registrarMateria(materia: Materia) {
    return this.http.post(`${this.apiUrl}/materias`, materia);
  }

  // Eliminar una materia por su ID
  eliminarMateria(id: string) {
    return this.http.delete(`${this.apiUrl}/materias/${id}`);
  }

  // Obtener una materia por su ID
  obtenerMateriaPorId(id: string) {
    return this.http.get(`${this.apiUrl}/materias/${id}`);
  }

  // Actualizar una materia por su ID
  actualizarMateria(id: string, materia: Materia) {
    return this.http.put(`${this.apiUrl}/materias/${id}`, materia);
  }
}
