import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GradoService } from '../../servicios/grado.service';
import { ProfesoresService } from '../../servicios/profesores.service';
import { MateriaService } from '../../servicios/materia.service';

import { ToastrService } from 'ngx-toastr';
import { Grado } from '../../models/grado.models';
import { Profesor } from '../../models/profesor.model';
import { Materia } from '../../models/materia.model';

@Component({
  selector: 'app-listar-grados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-grados.html',
  styleUrls: ['./listar-grados.css'],
})
export class ListarGradosComponent implements OnInit {
  // ====== inyección de servicios ======
  private gradoService = inject(GradoService);
  private profesorService = inject(ProfesoresService);
  private materiaService = inject(MateriaService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  // ====== datos base ======
  grados: Grado[] = [];
  profesores: Profesor[] = [];
  materiasDisponibles: Materia[] = [];

  // ====== estado UI ======
  private _search = '';
  get search(): string { return this._search; }
  set search(v: string) {
    this._search = v ?? '';
    this.page = 1; // al escribir, vuelve a la primera página
  }

  page: number = 1;       // página actual (1-indexed)
  pageSize: number = 5;   // filas por página

  selected: Grado | null = null; // fila seleccionada (para resaltar)

  // ================== ciclo de vida ==================
  ngOnInit(): void {
    this.cargarGrados();
    this.cargarProfesores();
    this.cargarMaterias();
  }

  // ================== cargas ==================
  cargarGrados(): void {
    this.gradoService.obtenerGrados().subscribe({
      next: (data) => {
        this.grados = data ?? [];
        // autoselecciona el primero si no hay selección
        if (!this.selected && this.grados.length) this.seleccionar(this.grados[0]);
        // asegura que la página no quede fuera de rango
        if (this.page > this.totalPages) this.page = this.totalPages;
      },
      error: (err) => {
        console.error('Error al cargar los grados', err);
        this.toastr.error('Error al cargar los grados');
      },
    });
  }

  cargarProfesores(): void {
    this.profesorService.obtenerProfesores().subscribe({
      next: (data) => (this.profesores = data ?? []),
      error: (err) => {
        console.error('Error al cargar los profesores', err);
        this.toastr.error('Error al cargar los profesores');
      },
    });
  }

  cargarMaterias(): void {
    this.materiaService.obtenerMaterias().subscribe({
      next: (data) => (this.materiasDisponibles = data ?? []),
      error: (err) => {
        console.error('Error al cargar las materias', err);
        this.toastr.error('Error al cargar las materias');
      },
    });
  }

  // ================== helpers opcionales ==================
  obtenerProfesorNombre(profesorId: string): string {
    const p = this.profesores.find((x) => x._id === profesorId);
    return p ? `${p.nombre} ${p.apellido}` : 'Profesor no encontrado';
  }
  obtenerMateriaNombre(materiaId: string): string {
    const m = this.materiasDisponibles.find((x) => x._id === materiaId);
    return m ? m.nombre : 'Materia no encontrada';
  }

  // ================== filtrado & paginación (como PROPIEDADES) ==================
  get filtered(): Grado[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.grados;
    return this.grados.filter((g) =>
      [
        g._id,
        g.nombre,           // campo corregido
        (g as any).aula,    // si existen en tu modelo
        (g as any).seccion, // si existen en tu modelo
      ]
        .map((v) => (v ?? '').toString().toLowerCase())
        .some((x) => x.includes(q))
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  /** Arreglo que muestra la tabla (usado como `*ngFor="let g of paged"` en el HTML) */
  get paged(): Grado[] {
    const p = Math.min(this.page, this.totalPages);
    const start = (p - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  // ====== valores del footer izquierdo ======
  get leftTotal(): number { return this.filtered.length; }
  get leftStart(): number {
    return this.leftTotal ? (this.page - 1) * this.pageSize + 1 : 0;
  }
  get leftEnd(): number {
    return this.leftTotal ? Math.min(this.page * this.pageSize, this.leftTotal) : 0;
  }

  // ================== selección de fila ==================
  seleccionar(g: Grado): void { this.selected = g; }

  // ================== acciones de botones ==================
  onCrear(): void {
    this.router.navigate(['/grados/crear']);
  }

  onVer(g: Grado): void {
    this.router.navigate([`/grados/ver/${g._id}`]);
  }

  onEditar(g: Grado): void {
    this.router.navigate([`/grados/editar/${g._id}`]);
  }

  onAsignar(g: Grado): void {
    // ruta de asignación de cursos/materias
    this.router.navigate([`/grados/${g._id}/asignar-cursos`]);
  }

  onEliminar(g: Grado): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este grado?')) return;

    this.gradoService.eliminarGrado(g._id).subscribe({
      next: () => {
        this.toastr.success('Grado eliminado con éxito');
        if (this.selected?._id === g._id) this.selected = null;
        this.cargarGrados();
      },
      error: (err) => {
        console.error('Error al eliminar el grado', err);
        this.toastr.error('Error al eliminar el grado');
      },
    });
  }
}
