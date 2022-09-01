import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDepenseEmpComponent } from './board-depense-emp.component';

describe('BoardDepenseEmpComponent', () => {
  let component: BoardDepenseEmpComponent;
  let fixture: ComponentFixture<BoardDepenseEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDepenseEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDepenseEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
