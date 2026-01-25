import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Municipality } from './municipality';

describe('Municipality', () => {
  let component: Municipality;
  let fixture: ComponentFixture<Municipality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Municipality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Municipality);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
