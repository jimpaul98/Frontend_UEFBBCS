import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule,NgIf,RouterLink],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  loading = signal(false);
  correo = '';

  onSubmit() {
    if (!this.correo) return;
    this.loading.set(true);
    this.authService.requestPasswordReset(this.correo).subscribe({
      next: (res) => this.toastr.success(res?.message || 'Revisa tu correo para continuar.'),
      error: (err) => this.toastr.error(err?.error?.message || 'No pudimos procesar tu solicitud.'),
      complete: () => this.loading.set(false),
    });
  }
}
