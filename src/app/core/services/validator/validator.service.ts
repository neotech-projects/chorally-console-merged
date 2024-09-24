// src/app/core/services/validators.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PackageModel } from 'src/app/core/models/package/package.model';
import { signal } from '@angular/core';
import { InstanceModel } from '../../models/instance/instance.model';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {


  isNameExistValidator(id: string, item: InstanceModel,itemsPackage = signal<PackageModel[]>([])): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const name = control.value;
      const items = itemsPackage();

      if (!name || !items) {
        return null;
      }

      if (id) {
        if (
          items.some(
            (pkg) =>
              item?.packageName &&
              pkg.name.toUpperCase() === name.toUpperCase()/* &&
              name.toUpperCase() !== item?.packageName.toUpperCase()*/
          )
        ) {
          return { exist: true };
        } else {
          return null;
        }
      } else {
        if (items.some((pkg) => pkg.name.toUpperCase() === name.toUpperCase())) {
          return { exist: true };
        } else {
          return null;
        }
      }
    };
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = control.value;
      if (!date) {
        return null;
      }

      if (date.match(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)) {
        return null;
      } else {
        return { invalidDate: true };
      }
    };
  }

  dateValidatorWithExpiryDateCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = control.value;
      if (!date) {
        return null;
      }
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const dateObject = new Date(date).getTime();
        const currentDate = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
        if (dateObject >= currentDate) {
          return null;
        } else {
          return { invalidDate: true };
        }
      } else {
        return { invalidDate: true };
      }
    };
  }


  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      if (!email) {
        return null;
      }

      if (
        email.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        )
      ) {
        return null;
      } else {
        return { invalidEmail: true };
      }
    };
  }
    
}
