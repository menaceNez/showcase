import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearstatsComponent } from './gearstats.component';

describe('GearstatsComponent', () => {
  let component: GearstatsComponent;
  let fixture: ComponentFixture<GearstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearstatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
