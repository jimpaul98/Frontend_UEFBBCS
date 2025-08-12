import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProfesores } from './listar-profesores';

describe('ListarProfesores', () => {
  let component: ListarProfesores;
  let fixture: ComponentFixture<ListarProfesores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProfesores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProfesores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
