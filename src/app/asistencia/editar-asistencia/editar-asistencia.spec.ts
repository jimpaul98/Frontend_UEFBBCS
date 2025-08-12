import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAsistencia } from './editar-asistencia';

describe('EditarAsistencia', () => {
  let component: EditarAsistencia;
  let fixture: ComponentFixture<EditarAsistencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAsistencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAsistencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
