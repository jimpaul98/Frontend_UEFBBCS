import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  private auth = inject(AuthService);
  usuarioNombre = '';

  ngOnInit(): void {
    this.usuarioNombre = this.auth.getUsuario()?.nombre ?? 'Usuario';
  }

  cerrarSesion(): void {
    this.auth.logout(); // limpia y navega al /login
  }

}
