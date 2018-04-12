import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileControlPanelComponent } from './profile-control-panel.component';

describe('ProfileControlPanelComponent', () => {
  let component: ProfileControlPanelComponent;
  let fixture: ComponentFixture<ProfileControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
