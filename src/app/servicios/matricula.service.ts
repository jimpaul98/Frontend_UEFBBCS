import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Paged } from '../models/common';
import { Matricula } from '../models/matricula';

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  constructor(private api: ApiService) {}
  listar(params?: any): Observable<Paged<Matricula>> { return this.api.get('/matriculas', params); }
  crear(body: any) { return this.api.post('/matriculas', body); }
  bulk(body: any) { return this.api.post('/matriculas/bulk', body); }
}
