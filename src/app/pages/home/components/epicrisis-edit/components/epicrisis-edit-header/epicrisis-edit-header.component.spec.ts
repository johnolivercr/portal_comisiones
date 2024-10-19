import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicrisisEditHeaderComponent } from './epicrisis-edit-header.component';

describe('EpicrisisEditHeaderComponent', () => {
  let component: EpicrisisEditHeaderComponent;
  let fixture: ComponentFixture<EpicrisisEditHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicrisisEditHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicrisisEditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
