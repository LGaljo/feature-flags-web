import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRolloutComponent } from './details-rollout.component';

describe('DetailsRolloutComponent', () => {
  let component: DetailsRolloutComponent;
  let fixture: ComponentFixture<DetailsRolloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRolloutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRolloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
