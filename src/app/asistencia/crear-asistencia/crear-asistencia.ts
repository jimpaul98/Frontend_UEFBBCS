import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '../../servicios/estudiantes.service';  // Servicio para estudiantes
import { GradoService } from '../../servicios/grado.service';  // Servicio para obtener grados
import { AsistenciaService } from '../../servicios/asistencia.service';  // Servicio para registrar asistencia
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../models/estudiante.model';  // Modelo de estudiante
import { Grado } from '../../models/grado.models';  // Modelo de grado
import { Asistencia } from '../../models/asistencia.model';  // Modelo de asistencia

@Component({
  selector: 'app-crear-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-asistencia.html',
  styleUrls: ['./crear-asistencia.css']
})
export class CrearAsistenciaComponent implements OnInit {
  private estudiantesService = inject(EstudiantesService);
  private gradoService = inject(GradoService);
  private asistenciaService = inject(AsistenciaService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  asistencia: Asistencia = {
    _id: '',
    id_clase:'',
    id_estudiante: '',
    id_grado: '',  // Ahora estamos utilizando id_grado
    fecha: '',
    asistio: false
  };

  estudiantes: Estudiante[] = [];
  grados: Grado[] = [];

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.cargarGrados();
  }

  cargarEstudiantes(): void {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (err) => {
        console.error('Error al cargar los estudiantes', err);
        this.toastr.error('Error al cargar los estudiantes');
      }
    });
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

  registrarAsistencia(form: NgForm): void {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.asistenciaService.registrarAsistencia(this.asistencia).subscribe({
      next: () => {
        this.toastr.success('Asistencia registrada con éxito');
        this.router.navigate(['/asistencias']);
      },
      error: (err) => {
        console.error('Error al registrar la asistencia', err);
        this.toastr.error('Error al registrar la asistencia');
      }
    });
  }
}
