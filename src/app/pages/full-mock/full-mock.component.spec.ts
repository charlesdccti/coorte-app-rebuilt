import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMockComponent } from './full-mock.component';

describe('FullMockComponent', () => {
  let component: FullMockComponent;
  let fixture: ComponentFixture<FullMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMockComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
