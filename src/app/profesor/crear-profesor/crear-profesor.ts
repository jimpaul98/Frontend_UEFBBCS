import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfesoresService } from '../../servicios/profesores.service';
import { ToastrService } from 'ngx-toastr';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-crear-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-profesor.html',
  styleUrls: ['./crear-profesor.css']
})
export class CrearProfesorComponent {
  private profesoresService = inject(ProfesoresService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  profesor: Profesor = {
    _id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    especialidad: ''
  };

  registrarProfesor(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.profesoresService.registrarProfesor(this.profesor).subscribe({
      next: () => {
        this.toastr.success('Profesor registrado con éxito');
        this.router.navigate(['/profesores']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al registrar el profesor');
      }
    });
  }
}
