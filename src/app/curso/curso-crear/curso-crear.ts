import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../servicios/curso.service';
import { MateriaService } from '../../servicios/materia.service';
import { ProfesorService } from '../../servicios/profesor.service';
import { AnioLectivoService } from '../../servicios/anioLectivo.service';

@Component({
  selector: 'app-curso-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './curso-crear.html',
  styleUrls: ['./curso-crear.css']
})
export class CursoCrearComponent implements OnInit {
  saving = false;
  form: FormGroup;
  materias: { _id: string; nombre: string }[] = [];
  profesores: { _id: string; apellidos: string; nombres: string }[] = [];
  anios: { _id: string; nombre: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: CursoService,
    private matSvc: MateriaService,
    private profSvc: ProfesorService,
    private anioSvc: AnioLectivoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      paralelo: ['', [Validators.required, Validators.maxLength(5)]],
      materiaId: ['', Validators.required],
      profesorId: ['', Validators.required],
      anioLectivoId: [''],      
      activo: [true]
    });
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.matSvc.listar({ limit: 1000 }).subscribe({ next: r => this.materias = (r.data||[]).map((m:any)=>({_id:m._id, nombre:m.nombre})) });
    this.profSvc.listar({ limit: 1000 }).subscribe({ next: r => this.profesores = (r.data||[]) });
    this.anioSvc.listar({ limit: 1000 }).subscribe({ next: r => this.anios = (r.data||[]) });
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.crear(this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/curso'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al crear'); }
    });
  }

  etiquetaProfesor(p: any) { return `${p.apellidos} ${p.nombres}`; }
}

