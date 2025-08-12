import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAsistencias } from './listar-asistencias';

describe('ListarAsistencias', () => {
  let component: ListarAsistencias;
  let fixture: ComponentFixture<ListarAsistencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAsistencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAsistencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
