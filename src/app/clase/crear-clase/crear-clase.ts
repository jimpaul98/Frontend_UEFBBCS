import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClasesService } from '../../servicios/clases.service';
import { ProfesoresService } from '../../servicios/profesores.service';
import { EstudiantesService } from '../../servicios/estudiantes.service';  // Incluir servicio de estudiantes
import { ToastrService } from 'ngx-toastr';
import { Clase } from '../../models/clase.model';
import { Profesor } from '../../models/profesor.model';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-crear-clase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-clase.html',
  styleUrls: ['./crear-clase.css']
})
export class CrearClaseComponent implements OnInit {
  private clasesService = inject(ClasesService);
  private profesoresService = inject(ProfesoresService);
  private estudiantesService = inject(EstudiantesService);  // Servicio de estudiantes
  private router = inject(Router);
  private toastr = inject(ToastrService);

  clase: Clase = {
    _id: '',
    grado: '',
    seccion: '',
    id_profesor: '',
    estudiantes: []
  };

  profesores: Profesor[] = [];
  estudiantes: Estudiante[] = [];  // Lista de estudiantes

  ngOnInit(): void {
    this.cargarProfesores();
    this.cargarEstudiantes();
  }

  // Método para cargar los profesores
  cargarProfesores() {
    this.profesoresService.obtenerProfesores().subscribe({
      next: (data) => this.profesores = data,
      error: (err) => {
        console.error('Error al cargar los profesores', err);
        this.toastr.error('Error al cargar los profesores');
      }
    });
  }

  // Método para cargar los estudiantes
  cargarEstudiantes() {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (data) => this.estudiantes = data,
      error: (err) => {
        console.error('Error al cargar los estudiantes', err);
        this.toastr.error('Error al cargar los estudiantes');
      }
    });
  }

  // Método para registrar la clase
  registrarClase(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.clasesService.registrarClase(this.clase).subscribe({
      next: () => {
        this.toastr.success('Clase registrada con éxito');
        this.router.navigate(['/clases']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al registrar la clase');
      }
    });
  }
}
