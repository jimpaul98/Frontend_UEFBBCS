import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Paged } from '../models/common';
import { Actividad } from '../models/actividad';
import { Nota } from '../models/nota';
import { PlanillaResponse } from '../models/plantilla'; 

@Injectable({ providedIn: 'root' })
export class CalificacionService {
  constructor(private api: ApiService) {}

  // Actividades
  actividades(params?: any): Observable<Paged<Actividad>> { return this.api.get('/calificaciones/actividades', params); }
  actividad(id: string) { return this.api.get<Actividad>(`/calificaciones/actividades/${id}`); }
  crearActividad(body: Partial<Actividad>) { return this.api.post<Actividad>('/calificaciones/actividades', body); }
  actualizarActividad(id: string, body: Partial<Actividad>) { return this.api.put<Actividad>(`/calificaciones/actividades/${id}`, body); }
  eliminarActividad(id: string) { return this.api.delete(`/calificaciones/actividades/${id}`); }

  // Notas
  crearNota(body: Nota) { return this.api.post('/calificaciones/notas', body); }
  actualizarNota(id: string, body: Partial<Nota>) { return this.api.put(`/calificaciones/notas/${id}`, body); }
  eliminarNota(id: string) { return this.api.delete(`/calificaciones/notas/${id}`); }
  bulkActividad(body: { actividadId: string; notas: { estudianteId: string; puntaje: number }[] }) {
    return this.api.post('/calificaciones/notas/bulk-actividad', body);
  }

  // Planilla
  planilla(cursoId: string, trimestre: number): Observable<PlanillaResponse> {
    return this.api.get('/calificaciones/planilla', { cursoId, trimestre });
  }
}
