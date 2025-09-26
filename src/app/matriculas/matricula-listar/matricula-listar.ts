import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatriculaService } from '../../servicios/matricula.service';
import { Matricula } from '../../models/matricula';

@Component({
  selector: 'app-matricula-listar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, RouterLink,DatePipe],
  templateUrl: './matricula-listar.html',
  styleUrls: ['./matricula-listar.css']
})
export class MatriculaListarComponent implements OnInit {
  loading = false;
  search = '';

  private all: Matricula[] = [];
  list: Matricula[] = [];

  constructor(private svc: MatriculaService) {}

  ngOnInit() { this.cargarDesdeServidor(); }

  cargarDesdeServidor() {
    this.loading = true;
    this.svc.listar({ limit: 1000 }).subscribe({
      next: r => {
        // defensivo: si no vienen etiquetas pobladas
        this.all = (r.data || []).map((m:any) => {
          const est = m.estudianteId && typeof m.estudianteId === 'object' ? m.estudianteId : null;
          const cur = m.cursoId && typeof m.cursoId === 'object' ? m.cursoId : null;

          const estudianteNombre = [est?.apellidos, est?.nombres].filter(Boolean).join(' ').trim() || m.estudianteNombre;
          const estudianteDni = m.estudianteDni || est?.dni;
          const cursoNombre = m.cursoNombre || cur?.nombre;
          const paralelo = m.paralelo || cur?.paralelo;
          const anioNombre = m.anioNombre || cur?.anioLectivoId?.nombre;

          return { ...m, estudianteNombre, estudianteDni, cursoNombre, paralelo, anioNombre } as Matricula;
        });
        this.aplicarFiltro(this.search);
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar la lista'); }
    });
  }

  onSearchChange(q: string) {
    this.search = q ?? '';
    this.aplicarFiltro(this.search);
  }

  private aplicarFiltro(q: string) {
    const t = (q || '').trim().toLowerCase();
    if (!t) { this.list = this.all.slice(); return; }
    this.list = this.all.filter(m =>
      (m.estudianteNombre || '').toLowerCase().includes(t) ||
      (m.estudianteDni || '').toLowerCase().includes(t) ||
      (m.cursoNombre || '').toLowerCase().includes(t) ||
      (m.paralelo || '').toLowerCase().includes(t) ||
      (m.anioNombre || '').toLowerCase().includes(t) ||
      (m.fecha || '').toLowerCase().includes(t)
    );
  }

  confirmarEliminar(item: Matricula) {
    if (!item._id) return;
    if (!confirm(`¿Eliminar la matrícula de ${item.estudianteNombre || 'estudiante'} en ${item.cursoNombre || 'curso'}?`)) return;
    this.svc.eliminar(item._id).subscribe({
      next: _ => this.cargarDesdeServidor(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
