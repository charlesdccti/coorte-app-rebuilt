import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockMongodbComponent } from './mock-mongodb.component';

describe('MockMongodbComponent', () => {
  let component: MockMongodbComponent;
  let fixture: ComponentFixture<MockMongodbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockMongodbComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockMongodbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
