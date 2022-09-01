import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedDepManComponent } from './denied-dep-man.component';

describe('DeniedDepManComponent', () => {
  let component: DeniedDepManComponent;
  let fixture: ComponentFixture<DeniedDepManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeniedDepManComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedDepManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
