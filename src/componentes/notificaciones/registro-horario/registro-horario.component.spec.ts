import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHorarioComponent } from './registro-horario.component';

describe('RegistroHorarioComponent', () => {
  let component: RegistroHorarioComponent;
  let fixture: ComponentFixture<RegistroHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
