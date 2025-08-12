import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  correo = '';
  clave = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  onLogin() {
    this.authService.login(this.correo, this.clave).subscribe({
      next: () => {
        this.toastr.success('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']); // Ajusta la ruta
      },
      error: () => {
        this.toastr.error('Correo o contraseña incorrectos');
      }
    });
  }
}
