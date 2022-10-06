import { FormControl } from "@angular/forms";

export interface ITodoForm {
  title: FormControl<string>;
  description: FormControl<string>;
}
export interface IRegistrationForm {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}