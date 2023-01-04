import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';

type ErrorInterface<T> = {
  loading: boolean;
  value?: T;
  error?: HttpErrorResponse;
}

@Pipe({
  name: 'asyncLoadingErrorPipe'
})
export class AsyncLoadingErrorPipePipe implements PipeTransform {

  transform<T>(val: Observable<T>): Observable<ErrorInterface<T>> {
    return val.pipe(
        map((value: T) => ({
          loading: false,
          value: value,
        })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error })))
      }
}
