import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExampleJaisocxTreeComponent } from './app-example-jaisocx-tree.component';

describe('AppExampleJaisocxTreeComponent', () => {
  let component: AppExampleJaisocxTreeComponent;
  let fixture: ComponentFixture<AppExampleJaisocxTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExampleJaisocxTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppExampleJaisocxTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
