import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Localaddress } from './localaddress';

describe('Localaddress', () => {
  let component: Localaddress;
  let fixture: ComponentFixture<Localaddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Localaddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Localaddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
