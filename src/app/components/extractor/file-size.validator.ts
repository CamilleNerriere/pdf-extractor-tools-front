import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
    if (file && file.size > maxSize) {
      return { fileSize: { maxSize } };
    }
    return null;
  };
}