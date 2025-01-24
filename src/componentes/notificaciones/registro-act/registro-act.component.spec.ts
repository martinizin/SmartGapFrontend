import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroActComponent } from './registro-act.component';

describe('RegistroActComponent', () => {
  let component: RegistroActComponent;
  let fixture: ComponentFixture<RegistroActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroActComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
