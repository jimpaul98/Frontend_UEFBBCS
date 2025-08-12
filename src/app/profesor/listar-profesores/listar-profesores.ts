import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfesoresService, Profesor } from '../../servicios/profesores.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-profesores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-profesores.html',
  styleUrls: ['./listar-profesores.css']
})
export class ListarProfesores implements OnInit {
  private profesoresService = inject(ProfesoresService);
  private router = inject(Router);
  private toastr = inject(ToastrService); 

  profesores: Profesor[] = [];

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores() {
    this.profesoresService.obtenerProfesores().subscribe({
      next: (data) => this.profesores = data,
      error: (err) => console.error('Error al cargar profesores:', err)
    });
  }

  agregarProfesor() {
    this.router.navigate(['/profesores/crear']);
  }

  editarProfesor(id: string) {
    this.router.navigate([`/profesores/editar/${id}`]);
  }

  eliminarProfesor(id: string) {
    if (confirm('¿Seguro que deseas eliminar este profesor?')) {
      this.profesoresService.eliminarProfesor(id).subscribe({
        next: () => {
          this.toastr.success('Profesor eliminado con éxito');
          this.cargarProfesores(); // Refresca la tabla
        },
        error: (err) => {
          console.error('Error al eliminar profesor:', err);
          this.toastr.error('Error al eliminar profesor');
        }
      });
    }
  }
}
