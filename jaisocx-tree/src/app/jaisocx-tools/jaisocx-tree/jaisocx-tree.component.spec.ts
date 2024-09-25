import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaisocxTreeComponent } from './jaisocx-tree.component';

describe('JaisocxTreeComponent', () => {
  let component: JaisocxTreeComponent;
  let fixture: ComponentFixture<JaisocxTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaisocxTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaisocxTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
