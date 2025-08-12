import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PadresService } from '../../servicios/padres.service';
import { EstudiantesService } from '../../servicios/estudiantes.service';
import { ToastrService } from 'ngx-toastr';
import { Padre } from '../../models/padre.model';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-crear-padre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-padre.html',
  styleUrls: ['./crear-padre.css']
})
export class CrearPadreComponent implements OnInit {
  private padresService = inject(PadresService);
  private estudiantesService = inject(EstudiantesService);  // Servicio para cargar estudiantes
  private router = inject(Router);
  private toastr = inject(ToastrService);

  padre: Padre = {
    _id: '',
    nombre: '',
    telefono: '',
    email: '',
    id_estudiante: ''
  };

  estudiantes: Estudiante[] = [];

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (data) => this.estudiantes = data,
      error: (err) => {
        console.error('Error al cargar los estudiantes', err);
        this.toastr.error('Error al cargar los estudiantes');
      }
    });
  }

  registrarPadre(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.padresService.registrarPadre(this.padre).subscribe({
      next: () => {
        this.toastr.success('Padre registrado con éxito');
        this.router.navigate(['/padres']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al registrar el padre');
      }
    });
  }
}
