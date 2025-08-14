import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GradoService } from '../../servicios/grado.service';
import { MateriaService } from '../../servicios/materia.service';  // Asegúrate de tener el servicio correcto
import { ToastrService } from 'ngx-toastr';
import { Grado } from '../../models/grado.models';
import { Materia } from '../../models/materia.model';
import { Profesor } from '../../models/profesor.model';
import { ProfesoresService } from '../../servicios/profesores.service';  // Para cargar los profesores

@Component({
  selector: 'app-crear-grado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-grado.html',
  styleUrls: ['./crear-grado.css']
})
export class CrearGradoComponent implements OnInit {
  private gradoService = inject(GradoService);
  private materiaService = inject(MateriaService);  
  private profesorService = inject(ProfesoresService);  // Corregido el nombre del servicio
  private router = inject(Router);
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

  materiasDisponibles: Materia[] = [];  // Lista para almacenar las materias disponibles
  profesoresDisponibles: Profesor[] = [];  // Lista para almacenar los profesores disponibles

  ngOnInit(): void {
    this.cargarMaterias();  // Cargar las materias cuando el componente se inicie
    this.cargarProfesores();  // Cargar los profesores cuando el componente se inicie
  }

  // Método para cargar las materias disponibles
  cargarMaterias(): void {
    this.materiaService.obtenerMaterias().subscribe({
      next: (data) => {
        this.materiasDisponibles = data;  // Asignar correctamente los datos al array
      },
      error: (err) => {
        console.error('Error al cargar las materias', err);
        this.toastr.error('Error al cargar las materias');
      }
    });
  }

  // Método para cargar los profesores disponibles
  cargarProfesores(): void {
    this.profesorService.obtenerProfesores().subscribe({
      next: (data) => {
        this.profesoresDisponibles = data;  // Asignar los datos de los profesores
      },
      error: (err) => {
        console.error('Error al cargar los profesores', err);
        this.toastr.error('Error al cargar los profesores');
      }
    });
  }

  // Método para registrar un nuevo Grado
  registrarGrado(form: NgForm): void {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.gradoService.registrarGrado(this.grado).subscribe({
      next: () => {
        this.toastr.success('Grado registrado con éxito');
        this.router.navigate(['/grados']);
      },
      error: (err) => {
        console.error('Error al registrar el grado:', err);
        this.toastr.error('Error al registrar el grado');
      }
    });
  }
}
