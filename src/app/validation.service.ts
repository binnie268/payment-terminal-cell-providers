import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidationService {

public static getErrorFormMessage(controlName: string, control: FormControl) {

  const errorMessages = {
    'amount': {
      'required': 'You must enter an amount',
      'min': `Amount shoud be more than ${control && control.errors.min ? control.errors.min.min : ''}`,
      'max': `Amount should be less than ${control && control.errors.max ? control.errors.max.max : ''}`
    },
    'phoneNumber': {
      'required': 'You must enter a phone number',
      'pattern': 'Phone number can only contain digits',
      'minlength': `Phone number should be ${control && control.errors.minlength ? control.errors.minlength.requiredLength : ''} digits`
    }
  };

  for (let propertyName in control.errors) {
    if (control.errors.hasOwnProperty(propertyName) && control.touched) {
      return errorMessages[controlName][propertyName];
    }
  }
}

}
