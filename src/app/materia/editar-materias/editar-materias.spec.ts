import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMaterias } from './editar-materias';

describe('EditarMaterias', () => {
  let component: EditarMaterias;
  let fixture: ComponentFixture<EditarMaterias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMaterias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMaterias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
