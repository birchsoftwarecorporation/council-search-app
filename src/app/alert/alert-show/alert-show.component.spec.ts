import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertShowComponent } from './alert-show.component';

describe('AlertShowComponent', () => {
  let component: AlertShowComponent;
  let fixture: ComponentFixture<AlertShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
