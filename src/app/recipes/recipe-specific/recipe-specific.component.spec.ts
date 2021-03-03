import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSpecificComponent } from './recipe-specific.component';

describe('RecipeSpecificComponent', () => {
  let component: RecipeSpecificComponent;
  let fixture: ComponentFixture<RecipeSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
