import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService,Usuario } from '../../servicios/usuarios.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-usuarios.html',
  styleUrls: ['./listar-usuarios.css']
})
export class ListarUsuarios implements OnInit {
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private toastr = inject(ToastrService); 

  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  agregarUsuario() {
    this.router.navigate(['/usuarios/crear']);
  }

  editarUsuario(id: string) {
    this.router.navigate([`/usuarios/editar/${id}`]);
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe({
        next: () => {
          this.toastr.success('Usuario eliminado con éxito');
          this.cargarUsuarios(); // Refresca la tabla
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          this.toastr.error('Error al eliminar usuario');
        }
      });
    }
}
}
