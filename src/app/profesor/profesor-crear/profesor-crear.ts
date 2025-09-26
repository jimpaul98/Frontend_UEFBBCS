import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../../servicios/profesor.service';

@Component({
  selector: 'app-profesor-crear',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './profesor-crear.html',
  styleUrls: ['./profesor-crear.css']
})
export class ProfesorCrearComponent {
  saving = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: ProfesorService, private router: Router) {
    this.form = this.fb.group({
      nombres:   ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
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
      next: _ => { this.saving = false; this.router.navigateByUrl('/profesor'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al crear'); }
    });
  }
}
