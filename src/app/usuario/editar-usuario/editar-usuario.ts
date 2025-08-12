import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.html',
  styleUrls: ['./editar-usuario.css']
})
export class EditarUsuario implements OnInit {
  private usuariosService = inject(UsuariosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  usuarioId: string = '';
  usuario: any = {
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    rol: '',
    correo: ''
  };

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id') || '';
    if (this.usuarioId) {
      this.usuariosService.obtenerUsuarioPorId(this.usuarioId).subscribe({
        next: (data: any) => this.usuario = data,
        error: () => this.toastr.error('Error al cargar el usuario')
      });
    }
  }

  actualizar(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor completa todos los campos');
      return;
    }

    this.usuariosService.actualizarUsuario(this.usuarioId, this.usuario).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado con éxito');
        this.router.navigate(['/usuarios']);
      },
      error: () => this.toastr.error('Error al actualizar el usuario')
    });
  }
}
