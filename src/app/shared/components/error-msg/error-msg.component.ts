import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Validation } from '@core/helpers/validation';

@Component({
   selector: 'err-msg',
   templateUrl: './error-msg.component.html',
   styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent {
   @Input() control: AbstractControl;
   @Input() ignoreTouch = false;
   @Input() withPatternControlName: string
   @Input() manualErrorMessage: string;

   get errorMessage() {
      if (this.manualErrorMessage) {
         return this.manualErrorMessage;
      }

      if (this.control) {
         for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && (this.control.value || this.control.touched || this.control.dirty || this.ignoreTouch)) {
               let message = '';

               if (this.withPatternControlName && propertyName === 'pattern') {
                  propertyName += this.withPatternControlName
               }

               return message
                  ? message
                  : Validation.getValidatorErrorMessage(
                     propertyName,
                     this.control.errors[propertyName]);
            }
         }
      }

      return null;
   }
}
