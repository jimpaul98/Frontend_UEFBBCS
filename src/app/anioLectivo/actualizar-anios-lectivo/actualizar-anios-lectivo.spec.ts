import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAniosLectivo } from './actualizar-anios-lectivo';

describe('ActualizarAniosLectivo', () => {
  let component: ActualizarAniosLectivo;
  let fixture: ComponentFixture<ActualizarAniosLectivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarAniosLectivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAniosLectivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
