import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueEmail implements AsyncValidator {
  constructor(private authSerivce: AuthService) {}

  validate = (control: AbstractControl) => {
    const { value } = control;
    console.log(value);

    return this.authSerivce.emailAvailable(value).pipe(
      map((value) => {
        if (!value.exist) {
          console.log('not exist');
          return null;
        }
      }),
      catchError((e) => {
        console.log(e);
        return of({ nonUniqueEmail: true });
      })
    );
  };
}
