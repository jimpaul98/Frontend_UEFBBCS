import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MateriasService, Materia } from '../../servicios/materia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-materias.html',
  styleUrls: ['./listar-materias.css']
})
export class ListarMaterias implements OnInit {
  private materiasService = inject(MateriasService);
  private router = inject(Router);
  private toastr = inject(ToastrService); 

  materias: Materia[] = [];

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materiasService.obtenerMaterias().subscribe({
      next: (data) => this.materias = data,
      error: (err) => console.error('Error al cargar materias:', err)
    });
  }

  agregarMateria() {
    this.router.navigate(['/materias/crear']);
  }

  editarMateria(id: string) {
    this.router.navigate([`/materias/editar/${id}`]);
  }

  eliminarMateria(id: string) {
    if (confirm('¿Seguro que deseas eliminar esta materia?')) {
      this.materiasService.eliminarMateria(id).subscribe({
        next: () => {
          this.toastr.success('Materia eliminada con éxito');
          this.cargarMaterias(); // Refresca la tabla
        },
        error: (err) => {
          console.error('Error al eliminar materia:', err);
          this.toastr.error('Error al eliminar materia');
        }
      });
    }
  }
}
