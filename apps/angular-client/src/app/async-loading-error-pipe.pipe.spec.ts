import { of, throwError } from 'rxjs';
import { AsyncLoadingErrorPipe } from './async-loading-error-pipe.pipe';

describe('AsyncLoadingErrorPipePipe', () => {
  it('create an instance', () => {
    const pipe = new AsyncLoadingErrorPipe();
    expect(pipe).toBeTruthy();
  });
  it('should verify when there is no error', (done: jest.DoneCallback) => {
    const pipeFn = new AsyncLoadingErrorPipe();
    pipeFn.transform(of(1)).subscribe({
      next: (response) => {
        if (!response.loading) {
          expect(response.value).toEqual(1);
          done();
        } else {
          expect(response.loading).toBeTruthy();
        }
      },
    });
  });
  it('should verify when there is an error', (done: jest.DoneCallback) => {
    const pipeFn = new AsyncLoadingErrorPipe();
    const error$ = throwError(() => {
      const error = new Error("This is a new error");
      return error;
    });
    pipeFn.transform(error$).subscribe({
      next: (response) => {
        if (!response.loading) {
          expect(response.error).toBeInstanceOf(Error);
          done();
        } else {
          expect(response.loading).toBeTruthy();
        }
      },
    });
  });
});
