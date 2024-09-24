import { FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../services/validator/validator.service';

const _validatorService = new ValidatorService();

export const contractExpiryControl = new FormControl('', [
  Validators.required,
  _validatorService.dateValidatorWithExpiryDateCheck(),
]);
export const domainNameControl = new FormControl('', Validators.required);
export const referenceDataEmailControl = new FormControl('', [
  Validators.required,
  _validatorService.emailValidator(),
]);
export const referenceDataLastNameControl = new FormControl(
  '',
  Validators.required
);
export const referenceDataNameControl = new FormControl(
  '',
  Validators.required
);
export const serviceDeactivationFirstIntervalControl = new FormControl(
  '',
  Validators.required
);
export const serviceDeactivationSecondIntervalControl = new FormControl(
  '',
  Validators.required
);
export const packageIdControl = new FormControl('', Validators.required);

export function reset() {
  contractExpiryControl.reset();
  domainNameControl.reset();
  referenceDataEmailControl.reset();
  referenceDataLastNameControl.reset();
  referenceDataNameControl.reset();
  serviceDeactivationFirstIntervalControl.reset();
  serviceDeactivationSecondIntervalControl.reset();
  packageIdControl.reset();
}
