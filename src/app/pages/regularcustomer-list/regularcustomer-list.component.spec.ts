import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularcustomerListComponent } from './regularcustomer-list.component';

describe('RegularcustomerListComponent', () => {
  let component: RegularcustomerListComponent;
  let fixture: ComponentFixture<RegularcustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularcustomerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegularcustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
