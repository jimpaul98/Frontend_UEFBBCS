import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfesorService } from '../../servicios/profesor.service';
import { Profesor } from '../../models/profesor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesor-listar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule,RouterLink],
  templateUrl: './profesor-listar.html',
  styleUrls: ['./profesor-listar.css']
})
export class ProfesorListarComponent implements OnInit {
  loading = false;
  search = '';

  private all: Profesor[] = []; // dataset completo desde el servidor
  list: Profesor[] = [];        // vista filtrada

  constructor(private svc: ProfesorService) {}

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
    const term = (q || '').trim().toLowerCase();
    if (!term) { this.list = this.all.slice(); return; }
    this.list = this.all.filter(p =>
      (p.nombres   || '').toLowerCase().includes(term) ||
      (p.apellidos || '').toLowerCase().includes(term) ||
      (p.correo    || '').toLowerCase().includes(term) ||
      (p.telefono  || '').toLowerCase().includes(term)
    );
  }

  confirmarEliminar(item: Profesor) {
    if (!item._id) return;
    if (!confirm(`¿Eliminar al profesor "${item.apellidos} ${item.nombres}"?`)) return;
    this.svc.eliminar(item._id).subscribe({
      next: _ => this.cargarDesdeServidor(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
