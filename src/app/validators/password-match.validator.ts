import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordMatchValidator(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === (control.parent?.controls as any)[matchTo].value)
      return null;
    else return { error: 'Not matching' }
  };
}