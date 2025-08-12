import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudiante } from './editar-estudiante';

describe('EditarEstudiante', () => {
  let component: EditarEstudiante;
  let fixture: ComponentFixture<EditarEstudiante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstudiante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstudiante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
