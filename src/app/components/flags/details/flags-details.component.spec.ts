import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsDetailsComponent } from './flags-details.component';

describe('DetailsComponent', () => {
  let component: FlagsDetailsComponent;
  let fixture: ComponentFixture<FlagsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
