import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGRORuleComponent } from './create-gro-rule.component';

describe('CreateGRORuleComponent', () => {
  let component: CreateGRORuleComponent;
  let fixture: ComponentFixture<CreateGRORuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGRORuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGRORuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
