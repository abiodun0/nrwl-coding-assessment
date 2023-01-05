import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { TicketsComponent } from './tickets.component';
import { ApiService } from '../api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AsyncLoadingErrorPipePipe } from '../async-loading-error-pipe.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TicketsComponent', () => {
  beforeEach(() => {
    const MatDialogMock = {
      open: jest.fn()
     };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatProgressBarModule, NoopAnimationsModule],
      providers: [ApiService, {provide: MatDialog, useValue: MatDialogMock}],
      declarations: [TicketsComponent, AsyncLoadingErrorPipePipe],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TicketsComponent);
    const component = fixture.componentInstance;
    const apiService = TestBed.inject(ApiService);
    jest.spyOn(apiService, 'tickets').mockImplementation(() => of([]));
    jest.spyOn(apiService, 'users').mockImplementation(() => of([]));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
