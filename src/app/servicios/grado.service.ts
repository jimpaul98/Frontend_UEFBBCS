import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grado } from '../models/grado.models';  // Importa el modelo de Grado

@Injectable({ providedIn: 'root' })
export class GradoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL a tu backend

  // Obtener todos los grados
  obtenerGrados(): Observable<Grado[]> {
    return this.http.get<Grado[]>(`${this.apiUrl}/grados`);
  }

  // Registrar un nuevo grado
  registrarGrado(grado: Grado): Observable<Grado> {
    return this.http.post<Grado>(`${this.apiUrl}/grados`, grado);
  }

  // Eliminar un grado por ID
  eliminarGrado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/grados/${id}`);
  }

  // Obtener un grado por su ID
  obtenerGradoPorId(id: string): Observable<Grado> {
    return this.http.get<Grado>(`${this.apiUrl}/grados/${id}`);
  }

  // Actualizar un grado por su ID
  actualizarGrado(id: string, grado: Grado): Observable<Grado> {
    return this.http.put<Grado>(`${this.apiUrl}/grados/${id}`, grado);
  }
}
