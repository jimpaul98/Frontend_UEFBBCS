import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Paged } from '../models/common';
import { AnioLectivo } from '../models/anio-lectivo';
import { Materia } from '../models/materia';
import { Profesor } from '../models/profesor';
import { Estudiante } from '../models/estudiante';
import { Curso } from '../models/curso';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private api: ApiService) {}
  anios(params?: any): Observable<Paged<AnioLectivo>> { return this.api.get('/anios-lectivos', params); }
  materias(params?: any): Observable<Paged<Materia>> { return this.api.get('/materias', params); }
  profesores(params?: any): Observable<Paged<Profesor>> { return this.api.get('/profesores', params); }
  estudiantes(params?: any): Observable<Paged<Estudiante>> { return this.api.get('/estudiantes', params); }
  cursos(params?: any): Observable<Paged<Curso>> { return this.api.get('/cursos', params); }
}
