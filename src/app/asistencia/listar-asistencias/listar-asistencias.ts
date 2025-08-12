import { Component, inject, OnInit } from '@angular/core';
import { AsistenciaService } from '../../servicios/asistencia.service';
import { ToastrService } from 'ngx-toastr';
import { Asistencia } from '../../models/asistencia.model'; 
import { CommonModule, NgFor } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-asistencias',
  imports: [CommonModule,NgFor],
  templateUrl: './listar-asistencias.html',
  styleUrls: ['./listar-asistencias.css']
})
export class ListarAsistenciasComponent implements OnInit {
  private asistenciaService = inject(AsistenciaService);
   private router = inject(Router);
  private toastr = inject(ToastrService);

  asistencias: Asistencia[] = [];

  ngOnInit(): void {
    this.cargarAsistencias();
  }

  agregarAsistencia() {
    this.router.navigate(['/usuarios/crear']);
  }  

  cargarAsistencias() {
    this.asistenciaService.obtenerAsistencias().subscribe({
      next: (data) => {
        // Asegúrate de que todas las asistencias tienen _id
        this.asistencias = data;
      },
      error: (err) => {
        console.error('Error al cargar asistencias', err);
        this.toastr.error('Error al cargar las asistencias');
      }
    });
  }

  editarAsistencia(id: string | undefined) {
  if (id) { // Verifica que id no sea undefined
    // Lógica para editar la asistencia
  } else {
    console.error("ID no válido");
  }
}

eliminarAsistencia(id: string | undefined) {
  if (id) { // Verifica que id no sea undefined
    if (confirm('¿Seguro que deseas eliminar esta asistencia?')) {
      this.asistenciaService.eliminarAsistencia(id).subscribe({
        next: () => {
          this.toastr.success('Asistencia eliminada con éxito');
          this.cargarAsistencias();  // Refresca la lista de asistencias
        },
        error: (err) => {
          console.error('Error al eliminar la asistencia', err);
          this.toastr.error('Error al eliminar la asistencia');
        }
      });
    }
  } else {
    console.error("ID no válido para eliminar");
  }
}

}
