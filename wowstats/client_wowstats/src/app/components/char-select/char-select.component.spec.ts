import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharSelectComponent } from './char-select.component';

describe('CharSelectComponent', () => {
  let component: CharSelectComponent;
  let fixture: ComponentFixture<CharSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
