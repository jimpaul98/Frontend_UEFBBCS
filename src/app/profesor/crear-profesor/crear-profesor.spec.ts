import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesor } from './crear-profesor';

describe('CrearProfesor', () => {
  let component: CrearProfesor;
  let fixture: ComponentFixture<CrearProfesor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearProfesor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProfesor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
