import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs';
import { ApiService } from '../api.service';
import { AsyncLoadingErrorPipePipe } from '../async-loading-error-pipe.pipe';

import { TicketDetailsComponent } from './ticket-details.component';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  beforeEach(async () => {
    const ApiServiceMock = {
      users: jest.fn().mockReturnValue(of([])),
      user: jest.fn().mockReturnValue(of({})),
      ticket: jest.fn().mockReturnValue(of({})),
      assign: jest.fn(),
      complete: jest.fn()
     };
     const MatSnackBarMock = {
      open: jest.fn()
     };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatCardModule,MatSelectModule, MatSlideToggleModule, NoopAnimationsModule],
      declarations: [TicketDetailsComponent, AsyncLoadingErrorPipePipe],
      providers: [{provide: ApiService, useValue: ApiServiceMock }, {provide: MatSnackBar, useValue: MatSnackBarMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
