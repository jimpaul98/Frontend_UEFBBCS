import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EstudiantesService} from '../../servicios/estudiantes.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-listar-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-estudiante.html',
  styleUrls: ['./listar-estudiante.css']
})
export class ListarEstudiantes implements OnInit {
  private estudiantesService = inject(EstudiantesService);
  private router = inject(Router);
  private toastr = inject(ToastrService); 

  estudiantes: Estudiante[] = [];

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (data) => this.estudiantes = data,
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  agregarEstudiante() {
    this.router.navigate(['/estudiantes/crear']);
  }

  editarEstudiante(id: string) {
    this.router.navigate([`/estudiantes/editar/${id}`]);
  }

  eliminarEstudiante(id: string) {
    if (confirm('¿Seguro que deseas eliminar este estudiante?')) {
      this.estudiantesService.eliminarEstudiante(id).subscribe({
        next: () => {
          this.toastr.success('Estudiante eliminado con éxito');
          this.cargarEstudiantes(); // Refresca la tabla
        },
        error: (err) => {
          console.error('Error al eliminar estudiante:', err);
          this.toastr.error('Error al eliminar estudiante');
        }
      });
    }
  }
}
