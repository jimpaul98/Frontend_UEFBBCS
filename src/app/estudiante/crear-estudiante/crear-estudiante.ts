import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '../../servicios/estudiantes.service';
import { ClasesService } from '../../servicios/clases.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../models/estudiante.model';
import { Clase } from '../../models/clase.model';

@Component({
  selector: 'app-crear-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-estudiante.html',
  styleUrls: ['./crear-estudiante.css']
})
export class CrearEstudianteComponent implements OnInit {
  private estudiantesService = inject(EstudiantesService);
  private clasesService = inject(ClasesService);
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
    id_clase: '',
    padre: { nombre: '', telefono: '', email: '' }
  };

  clases: Clase[] = [];

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases() {
    this.clasesService.obtenerClases().subscribe({
      next: (data) => this.clases = data,
      error: (err) => {
        console.error('Error al cargar clases', err);
        this.toastr.error('Error al cargar las clases');
      }
    });
  }

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
