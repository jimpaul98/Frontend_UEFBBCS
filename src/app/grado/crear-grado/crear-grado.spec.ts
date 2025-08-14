import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGrado } from './crear-grado';

describe('CrearGrado', () => {
  let component: CrearGrado;
  let fixture: ComponentFixture<CrearGrado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGrado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGrado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
