import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatriculaService } from '../../servicios/matricula.service';

type Row = {
  _id: string;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  telefono?: string;
  curso?: string;
  paralelo?: string;
  anioLectivo?: string;
  fecha?: string;
  activo?: boolean;
};

@Component({
  selector: 'app-matricula-listar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, RouterLink, DatePipe],
  templateUrl: './matricula-listar.html',
  styleUrls: ['./matricula-listar.css']
})
export class MatriculaListar implements OnInit {
  loading = false;
  search = '';

  private all: Row[] = [];
  list: Row[] = [];

  constructor(private svc: MatriculaService) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.svc.listar({ limit: 2000 }).subscribe({
      next: r => {
        // El backend ya devuelve los campos “humanos”
        this.all = (r.data || []) as Row[];
        this.aplicarFiltro(this.search);
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar'); }
    });
  }

  onSearchChange(v: string) {
    this.search = v ?? '';
    this.aplicarFiltro(this.search);
  }

  private aplicarFiltro(q: string) {
    const t = (q || '').trim().toLowerCase();
    if (!t) { this.list = this.all.slice(); return; }
    this.list = this.all.filter(m =>
      (`${m.apellidos || ''} ${m.nombres || ''}`.toLowerCase().includes(t)) ||
      (m.cedula || '').toLowerCase().includes(t) ||
      (m.curso || '').toLowerCase().includes(t) ||
      (m.paralelo || '').toLowerCase().includes(t) ||
      (m.anioLectivo || '').toLowerCase().includes(t) ||
      (m.correo || '').toLowerCase().includes(t) ||
      (m.telefono || '').toLowerCase().includes(t) ||
      (m.fecha || '').toLowerCase().includes(t)
    );
  }

  eliminar(item: Row) {
    if (!item._id) return;
    if (!confirm(`¿Eliminar matrícula de ${item.apellidos || ''} ${item.nombres || ''}?`)) return;
    this.svc.eliminar(item._id).subscribe({
      next: _ => this.cargar(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
