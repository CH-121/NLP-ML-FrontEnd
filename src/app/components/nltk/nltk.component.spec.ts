import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NltkComponent } from './nltk.component';

describe('NltkComponent', () => {
  let component: NltkComponent;
  let fixture: ComponentFixture<NltkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NltkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NltkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
