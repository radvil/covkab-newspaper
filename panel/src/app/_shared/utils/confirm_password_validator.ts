import { AbstractControl } from "@angular/forms";

export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get("password").value;
    let confirmPassword = control.get("confirmPassword").value;
    if (password != confirmPassword) {
      control.get("confirmPassword").setErrors({ shouldMatch: true });
    } else {
      return null;
    }
  }

  static MatchUpdatePassword(control: AbstractControl) {
    let newPassword = control.get("newPassword").value;
    let confirmPassword = control.get("confirmPassword").value;
    if (newPassword != confirmPassword) {
      control.get("confirmPassword").setErrors({ shouldMatch: true });
    } else {
      return null;
    }
  }
}