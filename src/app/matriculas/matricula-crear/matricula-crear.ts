import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatriculaService } from '../../servicios/matricula.service';
import { EstudianteService } from '../../servicios/estudiante.service';
import { CursoService } from '../../servicios/curso.service';

@Component({
  selector: 'app-matricula-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './matricula-crear.html',
  styleUrls: ['./matricula-crear.css']
})
export class MatriculaCrearComponent implements OnInit {
  saving = false;
  form: FormGroup;

  estudiantes: any[] = [];
  cursos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: MatriculaService,
    private estSvc: EstudianteService,
    private curSvc: CursoService,
    private router: Router
  ) {
    const hoy = new Date();
    const nd = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000);
    this.form = this.fb.group({
      estudianteId: ['', Validators.required],
      cursoId: ['', Validators.required],
      fecha: [nd.toISOString().slice(0,10), Validators.required], // yyyy-mm-dd
      activo: [true]
    });
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.estSvc.listar({ limit: 2000 }).subscribe({
      next: r => this.estudiantes = (r.data || []).map((e:any)=>({
        _id: e._id, etiqueta: `${e.apellidos} ${e.nombres} — ${e.dni}`
      }))
    });
    this.curSvc.listar({ limit: 2000 }).subscribe({
      next: r => this.cursos = (r.data || []).map((c:any)=>({
        _id: c._id, etiqueta: `${c.nombre}-${c.paralelo} (${c.anioNombre || 's/año'})`
      }))
    });
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    // convertir fecha input[type=date] a ISO (00:00 local → ISO)
    const v = { ...this.form.value } as any;
    v.fecha = new Date(v.fecha + 'T00:00:00').toISOString();

    this.saving = true;
    this.svc.crear(v).subscribe({
      next: _ => { this.saving = false; this.router.navigateByUrl('/matriculas'); },
      error: err => { this.saving = false; alert(err?.error?.mensaje || 'Error al crear'); }
    });
  }
}
