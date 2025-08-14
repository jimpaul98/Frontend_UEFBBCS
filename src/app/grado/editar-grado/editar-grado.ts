import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MateriaService } from '../../servicios/materia.service';
import { GradoService } from '../../servicios/grado.service'; // Para obtener las materias
import { ProfesoresService } from '../../servicios/profesores.service';  // Para obtener los profesores
import { ToastrService } from 'ngx-toastr';
import { Grado } from '../../models/grado.models';
import { Materia } from '../../models/materia.model';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-editar-grado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-grado.html',
  styleUrls: ['./editar-grado.css']
})
export class EditarGradoComponent implements OnInit {
  private gradoService = inject(GradoService);
  private materiaService = inject(MateriaService);  // Para cargar las materias
  private profesorService = inject(ProfesoresService);  // Para cargar los profesores
  private router = inject(Router);
  private route = inject(ActivatedRoute);  // Para obtener el ID del grado desde la URL
  private toastr = inject(ToastrService);

  grado: Grado = {
    _id: '',
    nombre: '',
    profesor_id: '',
    materia_ids: [],
    estudiantes_ids: [],
    horario: {
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: '',
      domingo: ''
    }
  };

  materiasDisponibles: Materia[] = [];  // Lista de materias disponibles
  profesoresDisponibles: Profesor[] = [];  // Lista de profesores disponibles

  ngOnInit(): void {
    this.cargarGrado();  // Cargar el grado que se va a editar
    this.cargarMaterias();  // Cargar las materias disponibles
    this.cargarProfesores();  // Cargar los profesores disponibles
  }

  // Obtener el grado por su ID desde la URL
  cargarGrado(): void {
    const gradoId = this.route.snapshot.paramMap.get('id');
    if (gradoId) {
      this.gradoService.obtenerGradoPorId(gradoId).subscribe({
        next: (data) => {
          this.grado = data;
        },
        error: (err) => {
          console.error('Error al cargar el grado', err);
          this.toastr.error('Error al cargar el grado');
        }
      });
    }
  }

  // Cargar las materias disponibles
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

  // Cargar los profesores disponibles
  cargarProfesores(): void {
    this.profesorService.obtenerProfesores().subscribe({
      next: (data) => {
        this.profesoresDisponibles = data;
      },
      error: (err) => {
        console.error('Error al cargar los profesores', err);
        this.toastr.error('Error al cargar los profesores');
      }
    });
  }

  // Método para actualizar el grado
  actualizarGrado(form: NgForm): void {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.gradoService.actualizarGrado(this.grado._id, this.grado).subscribe({
      next: () => {
        this.toastr.success('Grado actualizado con éxito');
        this.router.navigate(['/grados']);
      },
      error: (err) => {
        console.error('Error al actualizar el grado:', err);
        this.toastr.error('Error al actualizar el grado');
      }
    });
  }
}
