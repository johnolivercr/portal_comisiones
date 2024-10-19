import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicrisisHistoryComponent } from './epicrisis-history.component';

describe('EpicrisisHistoryComponent', () => {
  let component: EpicrisisHistoryComponent;
  let fixture: ComponentFixture<EpicrisisHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicrisisHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicrisisHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
