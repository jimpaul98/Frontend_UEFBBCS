import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnioLectivoService } from '../../servicios/anioLectivo.service';
import { GradoService } from '../../servicios/grado.service';  // Asegúrate de tener este servicio
import { ToastrService } from 'ngx-toastr';
import { AnioLectivo } from '../../models/anioLectivo.model';  // Asegúrate de tener el modelo adecuado
import { Grado } from '../../models/grado.models'; // Asegúrate de tener el modelo de Grado

@Component({
  selector: 'app-crear-anio-lectivo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-anios-lectivo.html',
  styleUrls: ['./crear-anios-lectivo.css'],
})
export class CrearAnioLectivoComponent implements OnInit {
  private anioLectivoService = inject(AnioLectivoService);
  private gradoService = inject(GradoService);  // Servicio para cargar los grados
  private router = inject(Router);
  private toastr = inject(ToastrService);

  anioLectivo: AnioLectivo = {
    _id: '',
    nombre: '',
    grado_ids: []  // Los grados seleccionados por el usuario
  };

  gradosDisponibles: Grado[] = [];  // Array para almacenar los grados disponibles

  ngOnInit(): void {
    this.cargarGradosDisponibles();
  }

  // Método para cargar los grados disponibles desde el servicio GradoService
  cargarGradosDisponibles(): void {
    this.gradoService.obtenerGrados().subscribe({
      next: (data) => {
        this.gradosDisponibles = data;
      },
      error: (err) => {
        console.error('Error al cargar los grados:', err);
        this.toastr.error('Error al cargar los grados');
      }
    });
  }

  // Método para registrar el Año Lectivo
  registrarAnioLectivo(form: NgForm): void {
    if (form.invalid) {
      this.toastr.error('Por favor complete todos los campos');
      return;
    }

    this.anioLectivoService.registrarAnioLectivo(this.anioLectivo).subscribe({
      next: () => {
        this.toastr.success('Año lectivo registrado con éxito');
        this.router.navigate(['/anio-lectivo']);  // Redirigir a la lista de Años Lectivos
      },
      error: (err) => {
        console.error('Error al registrar el año lectivo:', err);
        this.toastr.error('Error al registrar el año lectivo');
      },
    });
  }
}
