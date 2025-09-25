import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MateriaService } from '../../servicios/materia.service';
import { Materia } from '../../models/materia';

@Component({
  selector: 'app-materia-listar',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './materia-listar.html',
  styleUrls: ['./materia-listar.css']
})
export class MateriaListarComponent implements OnInit {
  loading = false;
  search = '';

  // mantenemos dos listas: todo y la vista
  private all: Materia[] = [];
  list: Materia[] = [];

  constructor(private svc: MateriaService) {}

  ngOnInit() { this.recargarDesdeServidor(); }

  recargarDesdeServidor() {
    this.loading = true;
    // pide TODO al backend; si tu backend sí soporta ?search=, puedes pasar search aquí
    this.svc.listar({ limit: 1000 /*, search: this.search */ }).subscribe({
      next: r => {
        this.all = r.data || [];
        this.aplicarFiltro();
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar la lista'); }
    });
  }

  cargar() {
    // si tu backend SÍ filtra, reemplaza por: this.recargarDesdeServidor();
    this.aplicarFiltro();
  }

  private aplicarFiltro() {
    const q = (this.search || '').trim().toLowerCase();
    if (!q) { this.list = this.all.slice(); return; }
    this.list = this.all.filter(m =>
      (m.nombre || '').toLowerCase().includes(q) ||
      (m.codigo || '').toLowerCase().includes(q) ||
      (m.area   || '').toLowerCase().includes(q)
    );
  }

  confirmarEliminar(item: Materia) {
    if (!item._id) return;
    if (!confirm(`¿Eliminar la materia "${item.nombre}"?`)) return;
    this.svc.eliminar(item._id).subscribe({
      next: _ => this.recargarDesdeServidor(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
