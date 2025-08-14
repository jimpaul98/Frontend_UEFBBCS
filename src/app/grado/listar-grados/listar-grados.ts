import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradoService } from '../../servicios/grado.service';
import { ProfesoresService } from '../../servicios/profesores.service';  // Para obtener los profesores
import { MateriaService } from '../../servicios/materia.service';  // Para obtener las materias
import { ToastrService } from 'ngx-toastr';
import { Grado } from '../../models/grado.models';
import { Profesor } from '../../models/profesor.model';
import { Materia } from '../../models/materia.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-grados',
  imports: [CommonModule],
  templateUrl: './listar-grados.html',
  styleUrls: ['./listar-grados.css']
})
export class ListarGradosComponent implements OnInit {
  private gradoService = inject(GradoService);
  private profesorService = inject(ProfesoresService);
  private materiaService = inject(MateriaService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  grados: Grado[] = [];
  profesores: Profesor[] = [];
  materiasDisponibles: Materia[] = [];

  ngOnInit(): void {
    this.cargarGrados();
    this.cargarProfesores();
    this.cargarMaterias();
  }

  cargarGrados(): void {
    this.gradoService.obtenerGrados().subscribe({
      next: (data) => {
        this.grados = data;
      },
      error: (err) => {
        console.error('Error al cargar los grados', err);
        this.toastr.error('Error al cargar los grados');
      }
    });
  }

   obtenerMateriaNombre(materiaId: string): string {
    const materia = this.materiasDisponibles.find(m => m._id === materiaId);
    return materia ? materia.nombre : 'Materia no encontrada';
  }

  cargarProfesores(): void {
    this.profesorService.obtenerProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
      },
      error: (err) => {
        console.error('Error al cargar los profesores', err);
        this.toastr.error('Error al cargar los profesores');
      }
    });
  }

  cargarMaterias(): void {
    this.materiaService.obtenerMaterias().subscribe({
      next: (data) => {
        this.materiasDisponibles = data;
      },
      error: (err) => {
        console.error('Error al cargar las materias', err);
        this.toastr.error('Error al cargar las materias');
      }
    });
  }

  obtenerProfesorNombre(profesorId: string): string {
    const profesor = this.profesores.find(prof => prof._id === profesorId);
    return profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Profesor no encontrado';
  }

  eliminarGrado(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este grado?')) {
      this.gradoService.eliminarGrado(id).subscribe({
        next: () => {
          this.toastr.success('Grado eliminado con éxito');
          this.cargarGrados();
        },
        error: (err) => {
          console.error('Error al eliminar el grado', err);
          this.toastr.error('Error al eliminar el grado');
        }
      });
    }
  }

  editarGrado(id: string): void {
    this.router.navigate([`/grados/editar/${id}`]);
  }

  // Método agregarGrado para redirigir a la página de creación del grado
  agregarGrado(): void {
    this.router.navigate(['/grados/crear']);  // Redirige a la ruta de crear-grado
  }
}
