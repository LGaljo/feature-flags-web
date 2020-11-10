import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateABTRuleComponent } from './create-abt-rule.component';

describe('CreateABTRuleComponent', () => {
  let component: CreateABTRuleComponent;
  let fixture: ComponentFixture<CreateABTRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateABTRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateABTRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
