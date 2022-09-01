import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardEmployeComponent } from './board-employe.component';

describe('BoardEmployeComponent', () => {
  let component: BoardEmployeComponent;
  let fixture: ComponentFixture<BoardEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
