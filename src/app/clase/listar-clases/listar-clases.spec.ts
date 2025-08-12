import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarClases } from './listar-clases';

describe('ListarClases', () => {
  let component: ListarClases;
  let fixture: ComponentFixture<ListarClases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarClases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarClases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
