import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../servicios/estudiante.service';

@Component({
  selector: 'app-estudiante-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './estudiante-crear.html',
  styleUrls: ['./estudiante-crear.css']
})
export class EstudianteCrearComponent {
  saving = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: EstudianteService, private router: Router) {
    this.form = this.fb.group({
      dni:       ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      nombres:   ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      correo:    ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
      telefono:  ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      activo:    [true]
    });
  }

  get f() { return this.form.controls; }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.crear(this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/estudiantes'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al crear'); }
    });
  }
}
