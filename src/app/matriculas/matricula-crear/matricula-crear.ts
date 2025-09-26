import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatriculaService } from '../../servicios/matricula.service';

@Component({
  selector: 'app-matricula-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './matricula-crear.html',
  styleUrls: ['./matricula-crear.css']
})
export class MatriculaCrearComponent {
  saving = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: MatriculaService,
    private router: Router
  ) {
    const hoy = new Date();
    const nd = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000);
    this.form = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(8)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.email]],
      telefono: [''],
      curso: ['', Validators.required],
      paralelo: ['', Validators.required],
      anioLectivo: ['', Validators.required],
      fecha: [nd.toISOString().slice(0,10), Validators.required], // yyyy-mm-dd
      activo: [true]
    });
  }

  get f() { return this.form.controls; }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = { ...this.form.value } as any;
    // convertir fecha local a ISO
    v.fecha = new Date(v.fecha + 'T00:00:00').toISOString();
    this.saving = true;
    this.svc.crear(v).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/matriculas'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al crear'); }
    });
  }
}
