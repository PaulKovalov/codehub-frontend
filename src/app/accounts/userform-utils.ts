import { FormGroup, ValidationErrors } from '@angular/forms';

export interface FormControlError {
  control: string;
  error: string;
  value: any;
}

export function getFormValidationErrors(form: FormGroup) {
  const result: FormControlError | ValidationErrors[] = [];
  if (form.errors) {
    result.push(form.errors);
  }
  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);
    if (control !== null) {
      const errors = control.errors;
      if (errors) {
        Object.keys(errors).forEach(keyError => {
          result.push({
            control: key,
            error: keyError,
            value: errors[keyError]
          });
        });
      }
    }
  });
  return result;
}

export function sortErrors(controlErrorsOrder, errors: ValidationErrors[]) {
  function compareErrors(a: FormControlError, b: FormControlError): number {
    return controlErrorsOrder[b.control] - controlErrorsOrder[a.control];
  }

  errors.sort(compareErrors);
}
