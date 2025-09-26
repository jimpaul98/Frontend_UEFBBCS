import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AnioLectivoService } from '../../servicios/anioLectivo.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface AnioLectivo {
  _id?: string;
  nombre: string;
  fecha_inicio: string; // ISO
  fecha_fin: string;    // ISO
  activo: boolean;
}

@Component({
  selector: 'app-anio-lectivo-listar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, DatePipe, RouterLink],
  templateUrl: './anio-lectivo-listar.html',
  styleUrls: ['./anio-lectivo-listar.css']
})
export class AnioLectivoListarComponent implements OnInit {
  loading = false;
  search = '';

  private all: AnioLectivo[] = []; // dataset completo desde el servidor
  list: AnioLectivo[] = [];        // vista filtrada

  constructor(private svc: AnioLectivoService) {}

  ngOnInit() { this.cargarDesdeServidor(); }

  cargarDesdeServidor() {
    this.loading = true;
    this.svc.listar({ limit: 1000 /*, search: this.search*/ }).subscribe({
      next: r => {
        this.all = r.data || [];
        this.aplicarFiltro(this.search);
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar la lista'); }
    });
  }

  // Se dispara al escribir/borrar en el input
  onSearchChange(q: string) {
    this.search = q ?? '';
    this.aplicarFiltro(this.search);
  }

  private aplicarFiltro(q: string) {
    const term = (q || '').trim().toLowerCase();
    if (!term) { this.list = this.all.slice(); return; }
    this.list = this.all.filter(a =>
      (a.nombre || '').toLowerCase().includes(term)
      // Si quieres incluir fechas en la búsqueda de texto:
      // || (new Date(a.fecha_inicio).toLocaleDateString()).toLowerCase().includes(term)
      // || (new Date(a.fecha_fin).toLocaleDateString()).toLowerCase().includes(term)
    );
  }

  confirmarEliminar(item: AnioLectivo) {
    if (!item._id) return;
    if (!confirm(`¿Eliminar el año lectivo "${item.nombre}"?`)) return;
    this.svc.eliminar(item._id).subscribe({
      next: _ => this.cargarDesdeServidor(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
