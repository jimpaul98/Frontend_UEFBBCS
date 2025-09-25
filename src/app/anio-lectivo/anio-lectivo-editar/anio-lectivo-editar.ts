import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AnioLectivoService } from '../../servicios/anioLectivo.service';
import { AnioLectivo } from '../../models/anio-lectivo';


function finMayorIgualInicio(ctrl: AbstractControl): ValidationErrors | null {
  const fi = ctrl.get('fecha_inicio')?.value;
  const ff = ctrl.get('fecha_fin')?.value;
  if (fi && ff && ff < fi) return { rangoInvalido: true };
  return null;
}

function isoDateOnly(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const nd = new Date(d.getTime() - d.getTimezoneOffset() * 60000); // mantener fecha local en input[type=date]
  return nd.toISOString().slice(0, 10);
}

@Component({
  selector: 'app-anio-lectivo-editar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './anio-lectivo-editar.html',
  styleUrls: ['./anio-lectivo-editar.css']
})
export class AnioLectivoEditarComponent implements OnInit {
  id!: string;
  loading = true;
  saving = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private svc: AnioLectivoService,
    private router: Router
  ) {
    // ✅ inicializar el form en el constructor
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      activo: [true]
    }, { validators: finMayorIgualInicio });
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.svc.obtener(this.id).subscribe({
      next: (doc: AnioLectivo) => {
        this.form.patchValue({
          nombre: doc.nombre,
          activo: !!doc.activo,
          fecha_inicio: isoDateOnly(doc.fecha_inicio),
          fecha_fin: isoDateOnly(doc.fecha_fin),
        });
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar'); this.router.navigateByUrl('/anios'); }
    });
  }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.actualizar(this.id, this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/anios'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al actualizar'); }
    });
  }
}

