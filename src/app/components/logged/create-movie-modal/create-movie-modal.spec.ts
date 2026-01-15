import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovieModal } from './create-movie-modal';

describe('CreateMovieModal', () => {
  let component: CreateMovieModal;
  let fixture: ComponentFixture<CreateMovieModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMovieModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMovieModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
