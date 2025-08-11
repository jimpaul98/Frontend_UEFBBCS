import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL

  // Helpers seguros para localStorage
  private lsGet(key: string): string | null {
    if (!this.isBrowser) return null;
    try { return localStorage.getItem(key); } catch { return null; }
  }
  private lsSet(key: string, value: string): void {
    if (!this.isBrowser) return;
    try { localStorage.setItem(key, value); } catch {}
  }
  private lsRemove(key: string): void {
    if (!this.isBrowser) return;
    try { localStorage.removeItem(key); } catch {}
  }

  login(correo: string, clave: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, clave }).pipe(
      tap((res) => {
        if (res?.token) this.lsSet('token', res.token);
        if (res?.user)  this.lsSet('usuario', JSON.stringify(res.user));
      })
    );
  }

  requestPasswordReset(email: string) {
    return this.http.post<{ ok: boolean; message: string }>(
      `${this.apiUrl}/forgot-password`,
      { correo: email }
    );
  }

  resetPassword(payload: { token: string; password: string }) {
    return this.http.post<{ ok: boolean; message: string }>(
      `${this.apiUrl}/reset-password`,
      payload
    );
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios`);
  }

  getUsuario(): any {
    const usuario = this.lsGet('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // ✅ Cerrar sesión con redirección
  logout(navigate = true): void {
    // (Opcional) notificar al backend para invalidar token
    // this.http.post(`${this.apiUrl}/logout`, {}).subscribe({ error: () => {} });

    this.lsRemove('token');
    this.lsRemove('usuario');

    if (navigate && this.isBrowser) {
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    return this.lsGet('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
