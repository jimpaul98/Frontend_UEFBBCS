import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AsistenciaService } from '../../servicios/asistencia.service';
import { EstudiantesService } from '../../servicios/estudiantes.service';
import { ClasesService } from '../../servicios/clases.service';  // Importar el servicio de clases
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../models/estudiante.model';  // Importar la interfaz de Estudiante
import { Clase } from '../../models/clase.model';  // Importar la interfaz de Clase

@Component({
  selector: 'app-crear-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-asistencia.html',
  styleUrls: ['./crear-asistencia.css']
})
export class CrearAsistenciaComponent implements OnInit {
  private asistenciaService = inject(AsistenciaService);
  private estudiantesService = inject(EstudiantesService);
  private clasesService = inject(ClasesService);  // Inyectar el servicio de clases
  private router = inject(Router);
  private toastr = inject(ToastrService);

  estudiantes: Estudiante[] = [];  // Lista de estudiantes
  clases: Clase[] = [];  // Lista de clases

  asistencia = {
    id_estudiante: '',
    id_clase: '',
    fecha: '',
    asistio: false
  };

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.cargarClases();
  }

  // Método para cargar estudiantes
  cargarEstudiantes() {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (data) => this.estudiantes = data,
      error: (err) => {
        console.error('Error al cargar los estudiantes', err);
        this.toastr.error('Error al cargar los estudiantes');
      }
    });
  }

  // Método para cargar clases
  cargarClases() {
    this.clasesService.obtenerClases().subscribe({
      next: (data) => this.clases = data,
      error: (err) => {
        console.error('Error al cargar las clases', err);
        this.toastr.error('Error al cargar las clases');
      }
    });
  }

  registrar(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor completa todos los campos');
      return;
    }

    this.asistenciaService.registrarAsistencia(this.asistencia).subscribe({
      next: () => {
        this.toastr.success('Asistencia registrada con éxito');
        this.router.navigate(['/asistencia']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al registrar la asistencia');
      }
    });
  }
}

