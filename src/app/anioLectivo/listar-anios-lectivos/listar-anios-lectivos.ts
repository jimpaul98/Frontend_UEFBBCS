import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CatalogService } from '../../servicios/catalog.service'; 
import { AnioLectivo } from '../../models/anio-lectivo';

@Component({
  selector: 'app-listar-anios-lectivos',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './listar-anios-lectivos.html',
  styleUrls: ['./listar-anios-lectivos.css']
})
export class AniosListComponent implements OnInit {
  list: AnioLectivo[] = [];
  constructor(private catalog: CatalogService) {}
  ngOnInit(){ this.catalog.anios({limit:500}).subscribe(r => this.list = r.data); }
}