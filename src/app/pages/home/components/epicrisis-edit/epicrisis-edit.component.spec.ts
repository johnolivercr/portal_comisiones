import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicrisisEditComponent } from './epicrisis-edit.component';

describe('EpicrisisEditComponent', () => {
  let component: EpicrisisEditComponent;
  let fixture: ComponentFixture<EpicrisisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicrisisEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicrisisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
