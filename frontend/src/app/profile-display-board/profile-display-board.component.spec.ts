import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDisplayBoardComponent } from './profile-display-board.component';

describe('ProfileDisplayBoardComponent', () => {
  let component: ProfileDisplayBoardComponent;
  let fixture: ComponentFixture<ProfileDisplayBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDisplayBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDisplayBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
