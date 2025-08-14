import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAniosLectivos } from './listar-anios-lectivos';

describe('ListarAniosLectivos', () => {
  let component: ListarAniosLectivos;
  let fixture: ComponentFixture<ListarAniosLectivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAniosLectivos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAniosLectivos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
