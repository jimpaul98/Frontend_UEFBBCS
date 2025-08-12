import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsistencia } from './crear-asistencia';

describe('CrearAsistencia', () => {
  let component: CrearAsistencia;
  let fixture: ComponentFixture<CrearAsistencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAsistencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAsistencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
