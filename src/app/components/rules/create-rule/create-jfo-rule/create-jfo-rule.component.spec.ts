import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJFORuleComponent } from './create-jfo-rule.component';

describe('CreateJFORuleComponent', () => {
  let component: CreateJFORuleComponent;
  let fixture: ComponentFixture<CreateJFORuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJFORuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJFORuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
