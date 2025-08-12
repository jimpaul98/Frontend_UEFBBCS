import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';// ajusta la ruta real

@Component({
  standalone: true,
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule,NgIf,RouterLink],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);

  loading = signal(false);
  token = '';
  password = '';
  confirm = '';

  constructor() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (!this.token) {
      this.token = this.route.snapshot.queryParamMap.get('token') || '';
    }
  }

  onSubmit(f: NgForm) {
    if (!f.valid || this.password !== this.confirm || !this.token) return;
    this.loading.set(true);
    this.authService.resetPassword({ token: this.token, password: this.password }).subscribe({
      next: (res) => {
        this.toastr.success(res?.message || 'Contraseña actualizada.');
        this.router.navigateByUrl('/login');
      },
      error: (err) => this.toastr.error(err?.error?.message || 'No se pudo restablecer la contraseña.'),
      complete: () => this.loading.set(false),
    });
  }
}
