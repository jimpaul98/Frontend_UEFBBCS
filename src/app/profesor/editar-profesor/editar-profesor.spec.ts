import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfesor } from './editar-profesor';

describe('EditarProfesor', () => {
  let component: EditarProfesor;
  let fixture: ComponentFixture<EditarProfesor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProfesor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProfesor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
