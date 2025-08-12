import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClase } from './editar-clase';

describe('EditarClase', () => {
  let component: EditarClase;
  let fixture: ComponentFixture<EditarClase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarClase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarClase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
