import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PadresService, Padre } from '../../servicios/padres.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-padres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-padres.html',
  styleUrls: ['./listar-padres.css']
})
export class ListarPadres implements OnInit {
  private padresService = inject(PadresService);
  private router = inject(Router);
  private toastr = inject(ToastrService); 

  padres: Padre[] = [];

  ngOnInit(): void {
    this.cargarPadres();
  }

  cargarPadres() {
    this.padresService.obtenerPadres().subscribe({
      next: (data) => this.padres = data,
      error: (err) => console.error('Error al cargar padres:', err)
    });
  }

  agregarPadre() {
    this.router.navigate(['/padres/crear']);
  }

  editarPadre(id: string) {
    this.router.navigate([`/padres/editar/${id}`]);
  }

  eliminarPadre(id: string) {
    if (confirm('¿Seguro que deseas eliminar este padre?')) {
      this.padresService.eliminarPadre(id).subscribe({
        next: () => {
          this.toastr.success('Padre eliminado con éxito');
          this.cargarPadres(); // Refresca la tabla
        },
        error: (err) => {
          console.error('Error al eliminar padre:', err);
          this.toastr.error('Error al eliminar padre');
        }
      });
    }
  }
}
