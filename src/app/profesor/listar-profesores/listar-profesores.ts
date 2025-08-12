import { Component, inject, OnInit } from '@angular/core';
import { ProfesoresService } from '../../servicios/profesores.service';
import { ToastrService } from 'ngx-toastr';
import { Profesor } from '../../models/profesor.model'; 
import { Router } from '@angular/router'; // Importar el modelo correctamente
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-listar-profesores',
  imports: [CommonModule,NgFor],
  templateUrl: './listar-profesores.html',
  styleUrls: ['./listar-profesores.css']
})
export class ListarProfesoresComponent implements OnInit {
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
      error: (err) => {
        console.error('Error al cargar profesores', err);
        this.toastr.error('Error al cargar los profesores');
      }
    });
  }

  agregarProfesor() {
    this.router.navigate(['/usuarios/crear']);
  }

  editarProfesor(id: string) {
    this.router.navigate([`/usuarios/editar/${id}`]);
  }

  eliminarProfesor(id: string) {
    if (confirm('¿Seguro que deseas eliminar este profesor?')) {
      this.profesoresService.eliminarProfesor(id).subscribe({
        next: () => {
          this.toastr.success('Profesor eliminado con éxito');
          this.cargarProfesores(); // Refresca la lista de profesores
        },
        error: (err) => {
          console.error('Error al eliminar el profesor', err);
          this.toastr.error('Error al eliminar el profesor');
        }
      });
    }
  }
}
