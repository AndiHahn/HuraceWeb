import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumResultComponent } from './podium-result.component';

describe('PodiumResultComponent', () => {
  let component: PodiumResultComponent;
  let fixture: ComponentFixture<PodiumResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodiumResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
