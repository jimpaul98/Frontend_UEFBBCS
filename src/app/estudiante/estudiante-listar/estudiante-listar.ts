import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EstudianteService } from '../../servicios/estudiante.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-estudiante-listar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule,RouterLink],
  templateUrl: './estudiante-listar.html',
  styleUrls: ['./estudiante-listar.css']
})
export class EstudianteListarComponent implements OnInit {
  loading = false;
  search = '';

  private all: Estudiante[] = []; // dataset completo
  list: Estudiante[] = [];        // vista filtrada

  constructor(private svc: EstudianteService) {}

  ngOnInit() { this.cargarDesdeServidor(); }

  cargarDesdeServidor() {
    this.loading = true;
    this.svc.listar({ limit: 1000 }).subscribe({
      next: r => {
        this.all = r.data || [];
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
    this.list = this.all.filter(e =>
      (e.dni       || '').toLowerCase().includes(t) ||
      (e.apellidos || '').toLowerCase().includes(t) ||
      (e.nombres   || '').toLowerCase().includes(t) ||
      (e.correo    || '').toLowerCase().includes(t) ||
      (e.telefono  || '').toLowerCase().includes(t)
    );
  }

  confirmarEliminar(item: Estudiante) {
    if (!item._id) return;
    if (!confirm(`¿Eliminar a ${item.apellidos} ${item.nombres}?`)) return;
    this.svc.eliminar(item._id).subscribe({
      next: _ => this.cargarDesdeServidor(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
