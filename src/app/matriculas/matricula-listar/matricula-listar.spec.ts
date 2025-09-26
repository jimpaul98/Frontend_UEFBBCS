import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaListar } from './matricula-listar';

describe('MatriculaListar', () => {
  let component: MatriculaListar;
  let fixture: ComponentFixture<MatriculaListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculaListar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaListar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
