import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClasesService, Clase } from '../../servicios/clases.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-clases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-clases.html',
  styleUrls: ['./listar-clases.css']
})
export class ListarClases implements OnInit {
  private clasesService = inject(ClasesService);
  private router = inject(Router);
  private toastr = inject(ToastrService); 

  clases: Clase[] = [];

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases() {
    this.clasesService.obtenerClases().subscribe({
      next: (data) => this.clases = data,
      error: (err) => console.error('Error al cargar clases:', err)
    });
  }

  agregarClase() {
    this.router.navigate(['/clases/crear']);
  }

  editarClase(id: string) {
    this.router.navigate([`/clases/editar/${id}`]);
  }

  eliminarClase(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta clase?')) {
      this.clasesService.eliminarClase(id).subscribe({
        next: () => {
          this.toastr.success('Clase eliminada con éxito');
          this.cargarClases(); // Refresca la tabla
        },
        error: (err) => {
          console.error('Error al eliminar clase:', err);
          this.toastr.error('Error al eliminar clase');
        }
      });
    }
  }
}
