import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  rol: string;
  correo: string;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  obtenerUsuarioPorId(id: string) {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  actualizarUsuario(id: string, usuario: any) {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
  }
}
