import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../servicios/curso.service';
import { MateriaService } from '../../servicios/materia.service';
import { ProfesorService } from '../../servicios/profesor.service';
import { AnioLectivoService } from '../../servicios/anioLectivo.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-curso-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './curso-editar.html',
  styleUrls: ['./curso-editar.css']
})
export class CursoEditarComponent implements OnInit {
  id!: string;
  loading = true;
  saving = false;
  form: FormGroup;
  materias: { _id: string; nombre: string }[] = [];
  profesores: { _id: string; apellidos: string; nombres: string }[] = [];
  anios: { _id: string; nombre: string }[] = [];

  constructor(
    private route: ActivatedRoute,
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
      jornada: [''],
      cupo: [null, [Validators.min(1)]],
      activo: [true]
    });
  }

  get f() { return this.form.controls; }
  etiquetaProfesor(p: any) { return `${p.apellidos} ${p.nombres}`; }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    // cargar catálogos
    this.matSvc.listar({ limit: 1000 }).subscribe({ next: r => this.materias = (r.data||[]).map((m:any)=>({_id:m._id, nombre:m.nombre})) });
    this.profSvc.listar({ limit: 1000 }).subscribe({ next: r => this.profesores = (r.data||[]) });
    this.anioSvc.listar({ limit: 1000 }).subscribe({ next: r => this.anios = (r.data||[]) });

    // cargar curso
    this.svc.obtener(this.id).subscribe({
      next: (doc: Curso) => {
        this.form.patchValue({
          nombre: doc.nombre,
          paralelo: doc.paralelo,
          materiaId: doc.materiaId,
          profesorId: doc.profesorId,
          anioLectivoId: doc.anioLectivoId || '',          
          activo: !!doc.activo
        });
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar'); this.router.navigateByUrl('/curso'); }
    });
  }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.actualizar(this.id, this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/curso'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al actualizar'); }
    });
  }
}
