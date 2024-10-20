import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../../layouts/auth/auth-layout/auth-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, AuthLayoutComponent, RouterLink, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: [],
})
export class RegistrationComponent {
  form: FormGroup;
  title = 'Sign Up';
  imageSrc = '/images/loginbgsec.png';

  // List of password requirements
  passwordRequirements = [
    { id: 'minLength', text: 'At least 6 characters long', met: false },
    { id: 'uppercase', text: 'At least one uppercase letter', met: false },
    { id: 'lowercase', text: 'At least one lowercase letter', met: false },
    { id: 'digit', text: 'At least one digit', met: false },
    { id: 'specialChar', text: 'At least one special character', met: false },
  ];

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
          this.passwordStrengthValidator.bind(this),
        ]),
        confirmPassword: this.formBuilder.control('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator for password strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    let hasUppercase = /[A-Z]/.test(value);
    let hasLowercase = /[a-z]/.test(value);
    let hasDigit = /[0-9]/.test(value);
    let hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
    let minLength = value.length >= 6;

    // Update the password requirements status
    this.passwordRequirements = [
      { id: 'minLength', text: 'At least 6 characters long', met: minLength },
      {
        id: 'uppercase',
        text: 'At least one uppercase letter',
        met: hasUppercase,
      },
      {
        id: 'lowercase',
        text: 'At least one lowercase letter',
        met: hasLowercase,
      },
      { id: 'digit', text: 'At least one digit', met: hasDigit },
      {
        id: 'specialChar',
        text: 'At least one special character',
        met: hasSpecialChar,
      },
    ];

    if (
      !minLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasDigit ||
      !hasSpecialChar
    ) {
      return { passwordStrength: 'Password does not meet all requirements.' };
    }
    return null;
  }

  // Password match validator
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
    }
    if (formControls['confirmPassword'].hasError('required')) {
      this.toastr.error('Confirm Password is required', '');
    }
    if (this.form.hasError('mismatch')) {
      this.toastr.error('Passwords do not match', '');
    }
  }
}
