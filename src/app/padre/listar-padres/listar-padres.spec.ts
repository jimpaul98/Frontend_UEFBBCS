import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPadres } from './listar-padres';

describe('ListarPadres', () => {
  let component: ListarPadres;
  let fixture: ComponentFixture<ListarPadres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPadres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPadres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
