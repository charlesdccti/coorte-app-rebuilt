import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthResearchComponent } from './health-research.component';

describe('HealthResearchComponent', () => {
  let component: HealthResearchComponent;
  let fixture: ComponentFixture<HealthResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthResearchComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
