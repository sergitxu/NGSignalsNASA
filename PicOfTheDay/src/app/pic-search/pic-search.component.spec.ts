import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicSearchComponent } from './pic-search.component';

describe('PicSearchComponent', () => {
  let component: PicSearchComponent;
  let fixture: ComponentFixture<PicSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PicSearchComponent]
    });
    fixture = TestBed.createComponent(PicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
