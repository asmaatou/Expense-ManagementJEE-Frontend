import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDepenseManComponent } from './board-depense-man.component';

describe('BoardDepenseManComponent', () => {
  let component: BoardDepenseManComponent;
  let fixture: ComponentFixture<BoardDepenseManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDepenseManComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDepenseManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
