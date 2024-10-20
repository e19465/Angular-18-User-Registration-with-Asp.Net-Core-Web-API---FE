import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../../layouts/auth/auth-layout/auth-layout.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, AuthLayoutComponent, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: [],
})
export class RegistrationComponent {
  form: FormGroup;
  title = 'Sign Up';
  imageSrc = '/images/loginbgsec.png';

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = new FormGroup(
      {
        name: this.formBuilder.control('', Validators.required),
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: this.formBuilder.control('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Corrected validator function
  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Submitted', formData);
      this.toastr.success('Registration successful!', '');
    } else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors() {
    // Check each form field for errors and show appropriate toast messages
    const formControls = this.form.controls;

    if (formControls['name'].hasError('required')) {
      this.toastr.error('Name is required', '');
    }

    if (formControls['email'].hasError('required')) {
      this.toastr.error('Email is required', '');
    } else if (formControls['email'].hasError('email')) {
      this.toastr.error('Invalid email format', '');
    }

    if (formControls['password'].hasError('required')) {
      this.toastr.error('Password is required', '');
    } else if (formControls['password'].hasError('minlength')) {
      this.toastr.error('Password must be at least 6 characters long', '');
    }

    if (formControls['confirmPassword'].hasError('required')) {
      this.toastr.error('Confirm Password is required', '');
    }

    // Check the form-level validation for password mismatch
    if (this.form.hasError('mismatch')) {
      this.toastr.error('Passwords do not match', '');
    }
  }
}
