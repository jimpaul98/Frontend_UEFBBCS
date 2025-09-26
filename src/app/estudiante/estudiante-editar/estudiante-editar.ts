import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../servicios/estudiante.service';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-estudiante-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './estudiante-editar.html',
  styleUrls: ['./estudiante-editar.css']
})
export class EstudianteEditarComponent implements OnInit {
  id!: string;
  loading = true;
  saving = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private svc: EstudianteService,
    private router: Router
  ) {
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

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.svc.obtener(this.id).subscribe({
      next: (doc: Estudiante) => {
        this.form.patchValue({
          dni: doc.dni,
          apellidos: doc.apellidos,
          nombres: doc.nombres,
          correo: doc.correo,
          telefono: doc.telefono,
          activo: !!doc.activo
        });
        this.loading = false;
      },
      error: _ => { this.loading = false; alert('No se pudo cargar'); this.router.navigateByUrl('/estudiantes'); }
    });
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.svc.actualizar(this.id, this.form.value as any).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/estudiantes'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al actualizar'); }
    });
  }
}
