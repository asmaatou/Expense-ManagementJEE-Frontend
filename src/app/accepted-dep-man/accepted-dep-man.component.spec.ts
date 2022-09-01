import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedDepManComponent } from './accepted-dep-man.component';

describe('AcceptedDepManComponent', () => {
  let component: AcceptedDepManComponent;
  let fixture: ComponentFixture<AcceptedDepManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedDepManComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedDepManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
