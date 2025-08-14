import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '../../servicios/estudiantes.service';  // Servicio para estudiantes
import { GradoService } from '../../servicios/grado.service';  // Servicio para grados
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../models/estudiante.model';  // Modelo de estudiante
import { Grado } from '../../models/grado.models'; // Modelo de grado

@Component({
  selector: 'app-crear-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-estudiante.html',
  styleUrls: ['./crear-estudiante.css']
})
export class CrearEstudianteComponent implements OnInit {
  private estudiantesService = inject(EstudiantesService);
  private gradoService = inject(GradoService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  estudiante: Estudiante = {
    _id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    fechaNacimiento: '',
    id_grado: '',  // Ahora estamos usando id_grado
    padre: { nombre: '', telefono: '', email: '' }
  };

  gradosDisponibles: Grado[] = [];  // Lista para almacenar los grados disponibles

  ngOnInit(): void {
    this.cargarGrados();  // Cargar los grados cuando el componente se inicie
  }

  // Método para cargar los grados disponibles
  cargarGrados(): void {
    this.gradoService.obtenerGrados().subscribe({
      next: (data) => {
        this.gradosDisponibles = data;  // Asigna los grados disponibles al array `gradosDisponibles`
      },
      error: (err) => {
        console.error('Error al cargar los grados', err);
        this.toastr.error('Error al cargar los grados');
      }
    });
  }

  // Método para registrar el estudiante
  registrarEstudiante(form: NgForm): void {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.estudiantesService.registrarEstudiante(this.estudiante).subscribe({
      next: () => {
        this.toastr.success('Estudiante registrado con éxito');
        this.router.navigate(['/estudiantes']);  // Redirige a la lista de estudiantes
      },
      error: (err) => {
        console.error('Error al registrar el estudiante', err);
        this.toastr.error('Error al registrar el estudiante');
      }
    });
  }
}
