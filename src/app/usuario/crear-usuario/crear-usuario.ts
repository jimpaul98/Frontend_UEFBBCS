import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-usuario.html',
  styleUrls: ['./crear-usuario.css']
})
export class CrearUsuarioComponent {
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  usuario = {
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    rol: '',
    correo: '',
    clave: ''
  };

  registrar(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor completa todos los campos');
      return;
    }

    this.usuariosService.registrarUsuario(this.usuario).subscribe({
      next: () => {
        this.toastr.success('Usuario registrado con éxito');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al registrar el usuario');
      }
    });
  }
}
