import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPadre } from './editar-padre';

describe('EditarPadre', () => {
  let component: EditarPadre;
  let fixture: ComponentFixture<EditarPadre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPadre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPadre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
