import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AnioLectivoService } from '../../servicios/anioLectivo.service';
import { AnioLectivo } from '../../models/anio-lectivo';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anio-lectivo-listar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink,FormsModule,DatePipe],
  templateUrl: './anio-lectivo-listar.html',
  styleUrls: ['./anio-lectivo-listar.css']
})
export class AnioLectivoListarComponent implements OnInit {
  loading = false;
  list: AnioLectivo[] = [];
  search = '';

  constructor(private svc: AnioLectivoService, private router: Router){}

  ngOnInit(){ this.cargar(); }

  cargar(){
    this.loading = true;
    this.svc.listar({ limit: 200, search: this.search }).subscribe({
      next: r => { this.list = r.data || []; this.loading = false; },
      error: _ => { this.loading = false; alert('No se pudo cargar la lista'); }
    });
  }

  editar(id: string) {
    this.router.navigate([`/anios/editar/${id}`]);
  }

  confirmarEliminar(item: AnioLectivo){
    if (!item._id) return;
    if (!confirm(`¿Eliminar el año lectivo "${item.nombre}"?`)) return;
    this.svc.eliminar(item._id).subscribe({
      next: _ => this.cargar(),
      error: err => alert(err?.error?.mensaje || 'Error al eliminar')
    });
  }
}
