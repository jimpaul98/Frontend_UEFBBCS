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

  registrarPadre(padre: any) {
    return this.http.post(`${this.apiUrl}/padres`, padre);
  }
}
