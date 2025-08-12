import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Padre {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  id_estudiante: string; // ID del estudiante al que pertenece el padre
}

@Injectable({ providedIn: 'root' })
export class PadresService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  // Obtener todos los padres
  obtenerPadres(): Observable<Padre[]> {
    return this.http.get<Padre[]>(`${this.apiUrl}/padres`);
  }

  registrarPadre(padre: any) {
    return this.http.post(`${this.apiUrl}/padres`, padre);
  }

  eliminarPadre(id: string) {
    return this.http.delete(`${this.apiUrl}/padres/${id}`);
  }

  obtenerPadrePorId(id: string) {
    return this.http.get(`${this.apiUrl}/padres/${id}`);
  }

  actualizarPadre(id: string, padre: any) {
    return this.http.put(`${this.apiUrl}/padres/${id}`, padre);
  }
}
