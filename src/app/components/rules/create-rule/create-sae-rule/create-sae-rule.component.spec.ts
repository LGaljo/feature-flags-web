import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSAERuleComponent } from './create-sae-rule.component';

describe('CreateSAERuleComponent', () => {
  let component: CreateSAERuleComponent;
  let fixture: ComponentFixture<CreateSAERuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSAERuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSAERuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
