import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '../../servicios/estudiantes.service';
import { GradoService } from '../../servicios/grado.service'; // Corregido para usar GradoService
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../models/estudiante.model';
import { Grado } from '../../models/grado.models';  // Asegúrate de tener el modelo de Grado

@Component({
  selector: 'app-crear-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-estudiante.html',
  styleUrls: ['./crear-estudiante.css']
})
export class CrearEstudianteComponent implements OnInit {
  private estudiantesService = inject(EstudiantesService);
  private gradoService = inject(GradoService);  // Corregido para usar GradoService
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
    id_grado: '',  // Cambiado de id_clase a id_grado
    padre: { nombre: '', telefono: '', email: '' }
  };

  grados: Grado[] = [];  // Usamos Grado en lugar de Clase

  ngOnInit(): void {
    this.cargarGrados();
  }

  // Método para cargar los grados disponibles
  cargarGrados() {
    this.gradoService.obtenerGrados().subscribe({
      next: (data) => this.grados = data,
      error: (err) => {
        console.error('Error al cargar los grados', err);
        this.toastr.error('Error al cargar los grados');
      }
    });
  }

  // Método para registrar un estudiante
  registrarEstudiante(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.estudiantesService.registrarEstudiante(this.estudiante).subscribe({
      next: () => {
        this.toastr.success('Estudiante registrado con éxito');
        this.router.navigate(['/estudiantes']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al registrar el estudiante');
      }
    });
  }
}
