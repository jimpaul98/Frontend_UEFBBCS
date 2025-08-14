import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MateriasService } from '../../servicios/materia.service';
import { ProfesoresService } from '../../servicios/profesores.service';
import { ToastrService } from 'ngx-toastr';
import { Materia } from '../../models/materia.model';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-crear-materia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-materia.html',
  styleUrls: ['./crear-materia.css']
})
export class CrearMateriaComponent implements OnInit {
  private materiasService = inject(MateriasService);
  private profesoresService = inject(ProfesoresService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  materia: Materia = {
    _id: '',
    nombre: '',
    descripcion: '',
    id_profesor: ''
  };

  profesores: Profesor[] = [];

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores() {
    this.profesoresService.obtenerProfesores().subscribe({
      next: (data) => this.profesores = data,
      error: (err) => {
        console.error('Error al cargar los profesores', err);
        this.toastr.error('Error al cargar los profesores');
      }
    });
  }

  registrarMateria(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.materiasService.registrarMateria(this.materia).subscribe({
      next: () => {
        this.toastr.success('Materia registrada con éxito');
        this.router.navigate(['/materias']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al registrar la materia');
      }
    });
  }
}
