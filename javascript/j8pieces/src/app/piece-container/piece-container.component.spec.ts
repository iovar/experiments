/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PieceContainerComponent } from './piece-container.component';
import { AppModule } from '../app.module';

describe('Component: PieceContainer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(PieceContainerComponent);
    let component = fixture.debugElement.componentInstance;

    expect(component).toBeTruthy();
  });
});
