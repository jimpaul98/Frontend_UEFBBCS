import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AnioLectivoService } from '../../servicios/anioLectivo.service';

function finMayorIgualInicio(ctrl: AbstractControl): ValidationErrors | null {
  const fi = ctrl.get('fecha_inicio')?.value;
  const ff = ctrl.get('fecha_fin')?.value;
  if (fi && ff && ff < fi) return { rangoInvalido: true };
  return null;
}

@Component({
  selector: 'app-anio-lectivo-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './anio-lectivo-crear.html',
  styleUrls: ['./anio-lectivo-crear.css']
})
export class AnioLectivoCrearComponent {
  saving = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: AnioLectivoService, private router: Router) {
    // ✅ inicializar el form en el constructor
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      activo: [true]
    }, { validators: finMayorIgualInicio });
  }
  

  get f() { return this.form.controls; }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.crear(this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/anios'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al crear'); }
    });
  }
}
