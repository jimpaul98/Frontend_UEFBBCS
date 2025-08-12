import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMaterias } from './listar-materias';

describe('ListarMaterias', () => {
  let component: ListarMaterias;
  let fixture: ComponentFixture<ListarMaterias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarMaterias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMaterias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
