import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CursoService } from '../../servicios/curso.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-curso-listar',
  standalone: true,
  imports: [NgClass, FormsModule, RouterLink,CommonModule],
  templateUrl: './curso-listar.html',
  styleUrls: ['./curso-listar.css']
})
export class CursoListarComponent implements OnInit {
  loading = false;
  search = '';

  // dataset completo desde servidor
  private all: (Curso & {
    materiaNombre?: string;
    profesorNombre?: string;
    anioNombre?: string;
  })[] = [];

  // vista filtrada
  list: (Curso & {
    materiaNombre?: string;
    profesorNombre?: string;
    anioNombre?: string;
  })[] = [];

  constructor(private svc: CursoService) {}

  ngOnInit() {
    this.cargarDesdeServidor();
  }

  /** Llama al backend y normaliza las etiquetas aunque no vengan pobladas */
  cargarDesdeServidor() {
    this.loading = true;
    this.svc.listar({ limit: 1000 }).subscribe({
      next: (r) => {
        // mapeo defensivo: si los populate no llegan, evitamos undefined.apellidos
        this.all = (r.data || []).map((c: any) => {
          const mat = c?.materiaId && typeof c.materiaId === 'object' ? c.materiaId : null;
          const prof = c?.profesorId && typeof c.profesorId === 'object' ? c.profesorId : null;
          const anio = c?.anioLectivoId && typeof c.anioLectivoId === 'object' ? c.anioLectivoId : null;

          const profesorNombre =
            [prof?.apellidos, prof?.nombres].filter(Boolean).join(' ').trim() || c.profesorNombre;

          return {
            ...c,
            materiaNombre: c.materiaNombre || mat?.nombre,
            profesorNombre: profesorNombre || undefined,
            anioNombre: c.anioNombre || anio?.nombre
          } as Curso & { materiaNombre?: string; profesorNombre?: string; anioNombre?: string };
        });

        this.aplicarFiltro(this.search);
        this.loading = false;
      },
      error: _ => {
        this.loading = false;
        alert('No se pudo cargar la lista de cursos');
      }
    });
  }

  /** Dispara al escribir/borrar en el input */
  onSearchChange(q: string) {
    this.search = q ?? '';
    this.aplicarFiltro(this.search);
  }

  /** Filtrado en cliente (instantáneo) por múltiples campos */
  private aplicarFiltro(q: string) {
    const t = (q || '').trim().toLowerCase();
    if (!t) { this.list = this.all.slice(); return; }

    this.list = this.all.filter(c =>
      (c.nombre || '').toLowerCase().includes(t) ||
      (c.paralelo || '').toLowerCase().includes(t) ||
      (c.materiaNombre || '').toLowerCase().includes(t) ||
      (c.profesorNombre || '').toLowerCase().includes(t) ||
      (c.anioNombre || '').toLowerCase().includes(t),      
    );
  }

  /** Eliminación con confirmación y recarga */
  confirmarEliminar(item: Curso) {
    if (!item._id) return;
    if (!confirm(`¿Eliminar el curso/paralelo "${item.nombre}-${item.paralelo}"?`)) return;

    this.svc.eliminar(item._id).subscribe({
      next: _ => this.cargarDesdeServidor(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
