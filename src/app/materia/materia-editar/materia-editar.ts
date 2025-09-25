import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../servicios/materia.service';
import { Materia } from '../../models/materia';

@Component({
  selector: 'app-materia-editar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './materia-editar.html',
  styleUrls: ['./materia-editar.css']
})
export class MateriaEditar implements OnInit {
  id!: string;
  loading = true;
  saving = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private svc: MateriaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      area:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    });
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.svc.obtener(this.id).subscribe({
      next: (doc: Materia) => {
        this.form.patchValue({
          codigo: doc.codigo,
          nombre: doc.nombre,
          area:   doc.area
        });
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar'); this.router.navigateByUrl('/materia'); }
    });
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.actualizar(this.id, this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/materia'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al actualizar'); }
    });
  }
}
