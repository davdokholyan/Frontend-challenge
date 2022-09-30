export class Validation {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    const config: Record<string, string> = {
       'required': 'Required field',
       'minlength': `Minimum length ` + (validatorValue ? validatorValue.requiredLength : ''),
       'maxlength': `Maximum length ` + (validatorValue ? validatorValue.requiredLength : ''),
       'patternfirstname': 'Invalid Firstname format',
       'patternlastname': 'Invalid Lastname format',
       'patternemail': 'Invalid email format',
       'emailExists': 'Email address already exists',
       'notFound': 'Email address or password is incorrect',
    };

    return config[validatorName];
 }
}
