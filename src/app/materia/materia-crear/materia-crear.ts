import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../servicios/materia.service';

@Component({
  selector: 'app-materia-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './materia-crear.html',
  styleUrls: ['./materia-crear.css']
})
export class MateriaCrear {
  saving = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: MateriaService, private router: Router) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      area:   ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    });
  }

  get f() { return this.form.controls; }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.crear(this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/materia'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al crear'); }
    });
  }
}
