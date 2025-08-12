import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaService } from '../../servicios/asistencia.service';  // Importa el servicio de Asistencia
import { ToastrService } from 'ngx-toastr';
import { Asistencia } from '../../models/asistencia.model';  // Importa el modelo de Asistencia
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-asistencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-asistencias.html',
  styleUrls: ['./listar-asistencias.css']
})
export class ListarAsistenciasComponent implements OnInit {
  private asistenciaService = inject(AsistenciaService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  asistencias: Asistencia[] = [];

  ngOnInit(): void {
    this.cargarAsistencias();
  }

  agregarAsistencia() {
    this.router.navigate(['/usuarios/crear']);
  }

  cargarAsistencias() {
    this.asistenciaService.obtenerAsistencias().subscribe({
      next: (data) => this.asistencias = data,
      error: (err) => {
        console.error('Error al cargar asistencias', err);
        this.toastr.error('Error al cargar las asistencias');
      }
    });
  }

  editarAsistencia(id: string) {
    // Lógica para editar asistencia
  }

  eliminarAsistencia(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta asistencia?')) {
      this.asistenciaService.eliminarAsistencia(id).subscribe({
        next: () => {
          this.toastr.success('Asistencia eliminada con éxito');
          this.cargarAsistencias(); // Refresca la lista de asistencias
        },
        error: (err) => {
          console.error('Error al eliminar la asistencia', err);
          this.toastr.error('Error al eliminar la asistencia');
        }
      });
    }
  }
}
