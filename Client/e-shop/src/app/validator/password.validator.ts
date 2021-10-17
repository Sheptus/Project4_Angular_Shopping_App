import { AbstractControl } from '@angular/forms';

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  if (password.pristine || passwordConfirm.pristine) {
    return null;
  }
  return password && passwordConfirm && password.value !== passwordConfirm.value
    ? { misMatch: true }
    : null;
}
